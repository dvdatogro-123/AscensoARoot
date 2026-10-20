package com.equipo.ascensoaroot

import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.ColorDrawable
import android.graphics.pdf.PdfRenderer
import android.os.Bundle
import android.os.ParcelFileDescriptor
import android.text.TextUtils
import android.util.LruCache
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.AbsListView
import android.widget.BaseAdapter
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.ListView
import android.widget.TextView
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import java.io.File

/**
 * Visor de PDF dentro de la app. Usa PdfRenderer de Android: no necesita Internet,
 * permisos ni otra app instalada. Las paginas se dibujan al desplazarse y se guardan
 * en una cache limitada para no agotar la memoria.
 */
class PdfViewerActivity : ComponentActivity() {
    private var descriptor: ParcelFileDescriptor? = null
    private var renderer: PdfRenderer? = null
    private val pageCache = object : LruCache<Int, Bitmap>((Runtime.getRuntime().maxMemory() / 6).toInt()) {
        override fun sizeOf(key: Int, value: Bitmap): Int = value.byteCount
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        WindowCompat.setDecorFitsSystemWindows(window, false)

        val pdf = try {
            openPdf(requireNotNull(intent.getStringExtra(EXTRA_ASSET)))
        } catch (e: Exception) {
            Toast.makeText(this, "No se pudo abrir el documento.", Toast.LENGTH_LONG).show()
            finish()
            return
        }
        renderer = pdf
        val total = pdf.pageCount

        val background = Color.rgb(23, 20, 25)
        val orange = Color.rgb(243, 92, 25)
        val bright = Color.rgb(255, 141, 56)
        val muted = Color.rgb(170, 157, 164)
        val condensed = Typeface.create("sans-serif-condensed", Typeface.BOLD)

        val rail = View(this).apply { setBackgroundColor(orange) }
        val back = TextView(this).apply {
            text = "← AFs"
            setTextColor(bright)
            typeface = condensed
            setTextSize(TypedValue.COMPLEX_UNIT_SP, 15f)
            setPadding(0, dp(10), dp(16), dp(10))
            contentDescription = "Volver a actividades"
            setOnClickListener { finish() }
        }
        val counter = TextView(this).apply {
            text = "Página 1 de $total"
            setTextColor(muted)
            setTextSize(TypedValue.COMPLEX_UNIT_SP, 12f)
            gravity = Gravity.END
        }
        val topRow = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            addView(back)
            addView(counter, LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f))
        }
        val heading = TextView(this).apply {
            text = (intent.getStringExtra(EXTRA_TITLE) ?: "Documento").uppercase()
            setTextColor(Color.WHITE)
            typeface = condensed
            setTextSize(TypedValue.COMPLEX_UNIT_SP, 18f)
            maxLines = 2
            ellipsize = TextUtils.TruncateAt.END
            setPadding(0, 0, 0, dp(12))
        }
        val header = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(18), dp(4), dp(18), 0)
            addView(topRow)
            addView(heading)
        }

        val list = ListView(this).apply {
            setBackgroundColor(background)
            divider = ColorDrawable(Color.TRANSPARENT)
            dividerHeight = dp(12)
            setPadding(dp(14), dp(4), dp(14), dp(18))
            clipToPadding = false
            adapter = PageAdapter(total)
            setOnScrollListener(object : AbsListView.OnScrollListener {
                override fun onScrollStateChanged(view: AbsListView, scrollState: Int) = Unit
                override fun onScroll(view: AbsListView, first: Int, visible: Int, count: Int) {
                    counter.text = "Página ${first + 1} de $total"
                }
            })
        }

        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(background)
            addView(rail, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(4)).apply {
                leftMargin = dp(18); rightMargin = dp(18)
            })
            addView(header)
            addView(list, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f))
        }
        ViewCompat.setOnApplyWindowInsetsListener(root) { view, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            view.setPadding(bars.left, bars.top, bars.right, bars.bottom)
            insets
        }
        setContentView(root)
        ViewCompat.requestApplyInsets(root)
    }

    /** Copia el PDF de assets a la cache (PdfRenderer necesita un archivo) y lo abre. */
    private fun openPdf(assetPath: String): PdfRenderer {
        val file = File(cacheDir, "pdf/" + assetPath.substringAfterLast('/'))
        file.parentFile?.mkdirs()
        assets.open(assetPath).use { input -> file.outputStream().use { output -> input.copyTo(output) } }
        val fd = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY)
        descriptor = fd
        return PdfRenderer(fd)
    }

    private fun renderPage(index: Int, width: Int): Bitmap {
        pageCache.get(index)?.let { if (it.width == width) return it }
        val page = requireNotNull(renderer).openPage(index)
        try {
            val height = (width.toLong() * page.height / page.width).toInt().coerceAtLeast(1)
            val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
            bitmap.eraseColor(Color.WHITE)
            page.render(bitmap, null, null, PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY)
            pageCache.put(index, bitmap)
            return bitmap
        } finally {
            page.close()
        }
    }

    private inner class PageAdapter(private val pageTotal: Int) : BaseAdapter() {
        override fun getCount(): Int = pageTotal
        override fun getItem(position: Int): Any = position
        override fun getItemId(position: Int): Long = position.toLong()

        override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
            val image = convertView as? ImageView ?: ImageView(this@PdfViewerActivity).apply {
                layoutParams = AbsListView.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
                )
                adjustViewBounds = true
                scaleType = ImageView.ScaleType.FIT_CENTER
                setBackgroundColor(Color.WHITE)
            }
            val width = (parent.width - parent.paddingLeft - parent.paddingRight)
                .takeIf { it > 0 } ?: resources.displayMetrics.widthPixels
            image.setImageBitmap(renderPage(position, width))
            image.contentDescription = "Página ${position + 1} de $pageTotal"
            return image
        }
    }

    private fun dp(value: Int): Int = (value * resources.displayMetrics.density).toInt()

    override fun onDestroy() {
        pageCache.evictAll()
        renderer?.close()
        descriptor?.close()
        super.onDestroy()
    }

    companion object {
        const val EXTRA_ASSET = "asset"
        const val EXTRA_TITLE = "titulo"
    }
}
