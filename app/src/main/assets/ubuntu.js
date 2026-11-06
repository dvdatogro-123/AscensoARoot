/* Apartado Ubuntu: el contenido de cada AF, tema por tema, comparado con Ubuntu.
 *
 * Cada tema tiene:
 *   titulo:    nombre del subtema.
 *   veredicto: 'igual' (Ubuntu lo hace como dice la AF), 'distinto' (Ubuntu lo hace a su manera)
 *              o 'na' (no aplica a Ubuntu).
 *   af:        lo que dice la presentación de la AF.
 *   ubuntu:    cómo es en Ubuntu, según documentación oficial.
 *   fuentes:   claves de fuentesUbuntu (abajo) de donde sale la parte de Ubuntu.
 *
 * Bloques que se pueden usar dentro de af / ubuntu:
 *   'Texto'                          párrafo (admite **negritas**, *cursivas* y `código`)
 *   { h: 'Subtítulo' }               subtítulo pequeño
 *   { lista: ['a', 'b'] }            lista con viñetas
 *   { pasos: ['a', 'b'] }            lista numerada
 *   { def: [['Término', 'Qué es']] } términos con su definición
 *   { tabla: [['Col 1', 'Col 2'], ['a', 'b']] }  la primera fila es el encabezado
 *   { cmd: [['comando', 'qué hace']] }           bloque de terminal
 *   { nota: 'Texto' }                recuadro destacado
 */

// Documentación oficial: [nombre que se muestra, enlace].
const fuentesUbuntu = {
  releaseCycle: ['Ubuntu · Ciclo de versiones', 'https://ubuntu.com/about/release-cycle'],
  notas2604: ['Ubuntu · Notas de la versión 26.04 LTS', 'https://documentation.ubuntu.com/release-notes/26.04/'],
  descargaDesktop: ['Ubuntu · Descargar Ubuntu Desktop', 'https://ubuntu.com/download/desktop'],
  descargaServer: ['Ubuntu · Descargar Ubuntu Server', 'https://ubuntu.com/download/server'],
  kernelDocs: ['Ubuntu · Documentación del kernel', 'https://ubuntu.com/kernel/docs/'],
  modprobe: ['Manual de Ubuntu · modprobe(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/modprobe.8.html'],
  hier: ['Manual de Ubuntu · hier(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/hier.7.html'],
  proc: ['Manual de Ubuntu · proc(5)', 'https://manpages.ubuntu.com/manpages/noble/man5/proc.5.html'],
  syscalls: ['Manual de Ubuntu · syscalls(2)', 'https://manpages.ubuntu.com/manpages/noble/man2/syscalls.2.html'],
  ps: ['Manual de Ubuntu · ps(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/ps.1.html'],
  free: ['Manual de Ubuntu · free(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/free.1.html'],
  sched: ['Manual de Ubuntu · sched(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/sched.7.html'],
  capabilities: [
    'Manual de Ubuntu · capabilities(7)',
    'https://manpages.ubuntu.com/manpages/noble/man7/capabilities.7.html'
  ],
  getfacl: ['Manual de Ubuntu · getfacl(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/getfacl.1.html'],
  systemd: ['Manual de Ubuntu · systemd(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/systemd.1.html'],
  oomd: [
    'Manual de Ubuntu · systemd-oomd(8)',
    'https://manpages.ubuntu.com/manpages/noble/man8/systemd-oomd.service.8.html'
  ],
  notas2204: ['Ubuntu · Notas de la versión 22.04 LTS', 'https://documentation.ubuntu.com/release-notes/22.04/'],
  udev: ['Manual de Ubuntu · udev(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/udev.7.html'],
  apparmor: ['Ubuntu Server · AppArmor', 'https://ubuntu.com/server/docs/how-to/security/apparmor/'],
  usuarios: ['Ubuntu Server · Gestión de usuarios', 'https://ubuntu.com/server/docs/how-to/security/user-management/'],
  nvidia: [
    'Ubuntu Server · Instalar controladores NVIDIA',
    'https://ubuntu.com/server/docs/how-to/graphics/install-nvidia-drivers/'
  ],
  instaladorGuiado: [
    'Instalador de Ubuntu (Canonical) · almacenamiento guiado',
    'https://github.com/canonical/subiquity/blob/main/subiquity/ui/views/storage/guided.py'
  ],
  autoinstall: [
    'Instalador de Ubuntu (Canonical) · referencia de autoinstall',
    'https://github.com/canonical/subiquity/blob/main/doc/reference/autoinstall-reference.rst'
  ],
  curtinSwap: [
    'Curtin (Canonical) · configuración de swap',
    'https://curtin.readthedocs.io/en/latest/topics/config.html#swap'
  ],
  realtime: ['Ubuntu · Real-time Ubuntu', 'https://ubuntu.com/real-time'],
  core: ['Ubuntu · Ubuntu Core', 'https://ubuntu.com/core'],
  nube: ['Ubuntu · Ubuntu en la nube pública', 'https://ubuntu.com/cloud/public-cloud'],
  kubernetes: ['Ubuntu · Kubernetes', 'https://ubuntu.com/kubernetes'],
  libvirt: ['Ubuntu Server · libvirt (KVM)', 'https://ubuntu.com/server/docs/how-to/virtualisation/libvirt/'],
  wsl: ['Ubuntu · Ubuntu en WSL', 'https://ubuntu.com/wsl/docs/stable/'],
  ubports: ['UBports (comunidad, no oficial) · Ubuntu Touch', 'https://ubports.com/'],
  kEevdf: ['Kernel Linux · Planificador EEVDF', 'https://docs.kernel.org/scheduler/sched-eevdf.html'],
  kCgroup: ['Kernel Linux · Control Groups v2', 'https://docs.kernel.org/admin-guide/cgroup-v2.html'],
  kVfs: ['Kernel Linux · Virtual File System', 'https://docs.kernel.org/filesystems/vfs.html'],
  kExt4: ['Kernel Linux · ext4', 'https://docs.kernel.org/filesystems/ext4/overview.html']
};

const ubuntuAFs = [
  {
    id: 'AF1',
    title: 'Arquitectura, desempeño y tipos de sistemas operativos',
    temas: [
      {
        titulo: 'Introducción',
        veredicto: 'igual',
        af: [
          'Un sistema operativo es el programa fundamental encargado de organizar, coordinar y gestionar los recursos de un computador. Actúa como un intermediario directo entre el hardware y las aplicaciones del usuario, asegurando que los componentes —como la CPU, la memoria RAM y el almacenamiento— funcionen de manera integrada, eficiente y segura.',
          'Su propósito central es abstraer la complejidad técnica de la máquina para ofrecer un entorno estable, organizado y fácil de usar.'
        ],
        ubuntu: [
          'Ubuntu es un sistema operativo de Canonical construido sobre el **núcleo Linux**. Según la documentación del kernel de Ubuntu, el núcleo es "el software central que permite a las aplicaciones de Ubuntu interactuar con los recursos del sistema": justo el papel de intermediario que describe la AF.',
          'La versión de soporte largo más reciente es **Ubuntu 26.04 LTS**, publicada en abril de 2026, que trae el núcleo **Linux 7.0**.'
        ],
        fuentes: ['kernelDocs', 'notas2604', 'descargaDesktop']
      },
      {
        titulo: 'Definición del sistema operativo',
        veredicto: 'igual',
        af: [
          'Un sistema operativo es el programa que **controla la ejecución de aplicaciones** y actúa como **interfaz entre estas y el hardware**. También asigna recursos y evita usos incorrectos del computador.',
          { h: 'Aplicaciones → Sistema operativo → Hardware' },
          { def: [
            ['Facilidad', 'hace utilizable el equipo'],
            ['Eficiencia', 'aprovecha sus recursos'],
            ['Evolución', 'admite nuevas funciones']
          ] }
        ],
        ubuntu: [
          'Los tres objetivos de la AF se ven en cómo se publica Ubuntu:',
          { def: [
            [
              'Facilidad',
              'Ubuntu Desktop trae un escritorio gráfico (GNOME 50 en la versión 26.04) para usar el equipo sin conocer el hardware.'
            ],
            [
              'Eficiencia',
              'el núcleo reparte la CPU y la memoria entre los procesos (ver los temas de gestión).'
            ],
            [
              'Evolución',
              'sale una versión nueva cada seis meses y una LTS cada dos años, con 5 años de mantenimiento de seguridad estándar; con Ubuntu Pro llega hasta 15 años.'
            ]
          ] },
          'Para "evitar usos incorrectos", Ubuntu desactiva la cuenta root por defecto: la administración se hace con `sudo`, usando la contraseña propia de cada usuario autorizado.'
        ],
        fuentes: ['releaseCycle', 'descargaDesktop', 'usuarios']
      },
      {
        titulo: 'Componentes',
        veredicto: 'igual',
        af: [
          'La gestión se divide en subsistemas. Cada subsistema responde por un recurso o por una regla de acceso.',
          { lista: ['Procesos', 'Memoria', 'E/S', 'Archivos', 'Almacenamiento', 'Protección'] },
          'Todos se apoyan en el **núcleo (kernel)**.'
        ],
        ubuntu: [
          'Ubuntu tiene los mismos subsistemas, todos dentro del núcleo Linux:',
          { tabla: [
            ['Subsistema', 'Cómo lo resuelve Ubuntu'],
            ['Procesos', 'planificador del núcleo (EEVDF)'],
            ['Memoria', 'memoria virtual con archivo de intercambio'],
            ['E/S', 'controladores del núcleo y archivos de dispositivo en /dev'],
            ['Archivos', 'el VFS, que permite usar ext4 y otros sistemas de archivos'],
            ['Almacenamiento', 'particiones, LVM y sistemas de archivos'],
            ['Protección', 'usuarios y permisos, sudo y AppArmor']
          ] }
        ],
        fuentes: ['kEevdf', 'kVfs', 'hier', 'apparmor']
      },
      {
        titulo: 'Funciones: procesador y memoria',
        veredicto: 'igual',
        af: [
          'Procesador y memoria sostienen la ejecución.',
          { h: 'Procesos: decide qué trabajo usa la CPU' },
          { pasos: ['Crear y terminar procesos', 'Planificar procesos e hilos', 'Suspender, reanudar y comunicar'] },
          { h: 'Memoria: mantiene espacios utilizables y separados' },
          { lista: [
            'Registrar qué partes están en uso',
            'Asignar y liberar espacio',
            'Mover datos y proteger direcciones'
          ] },
          'Juntas permiten que varios trabajos progresen sin compartir el control de forma desordenada.'
        ],
        ubuntu: [
          { h: 'Procesos' },
          'El núcleo de Ubuntu crea, planifica, suspende y termina procesos. Desde Linux 6.6 el planificador por defecto es **EEVDF**, que sustituyó al anterior CFS. La prioridad de cada proceso se ajusta con el valor *nice*, que va de −20 (más prioridad) a +19 (menos).',
          { h: 'Memoria' },
          'Cada proceso tiene su propio espacio de direcciones. El sistema de archivos `/proc` muestra, por cada proceso, una carpeta con su número (PID) e información sobre él, como su mapa de memoria.'
        ],
        fuentes: ['kEevdf', 'sched', 'proc']
      },
      {
        titulo: 'Funciones: E/S, archivos y protección',
        veredicto: 'igual',
        af: [
          'E/S, archivos y protección cierran el ciclo. Una solicitud atraviesa capas hasta convertirse en una operación sobre un dispositivo o un dato persistente:',
          { pasos: [
            '**Aplicación**: solicita',
            '**Interfaz E/S**: uniforma',
            '**Driver**: traduce',
            '**Dispositivo**: transfiere',
            '**Archivo**: persiste'
          ] },
          '**Protección:** controla quién puede pedir, leer, escribir o modificar cada recurso.'
        ],
        ubuntu: [
          'En Ubuntu el recorrido de la AF es casi literal:',
          { pasos: [
            '**Aplicación:** pide la operación con una llamada al sistema, que el manual define como "la interfaz fundamental entre una aplicación y el núcleo Linux".',
            '**Interfaz E/S:** el VFS da una sola forma de trabajar con archivos y permite que distintos sistemas de archivos convivan.',
            '**Driver:** el controlador del núcleo traduce la orden al dispositivo.',
            '**Dispositivo:** aparece como un archivo especial en `/dev`.',
            '**Archivo:** los datos quedan guardados en el sistema de archivos.'
          ] },
          '**Protección:** cada archivo tiene permisos de lectura, escritura y ejecución para el dueño, el grupo y los demás, y se pueden agregar listas de control de acceso (ACL).'
        ],
        fuentes: ['syscalls', 'kVfs', 'hier', 'getfacl']
      },
      {
        titulo: 'Almacenamiento y directorios',
        veredicto: 'igual',
        af: [
          'La mayoría de los sistemas operativos usan una estructura jerárquica de almacenamiento de la información, y son capaces de gestionar varias unidades de almacenamiento. Para comunicar las unidades físicas con el usuario se utilizan las siguientes funciones:',
          '**Directorio:** es un tipo muy exclusivo de archivo que solo contiene la información para acceder a archivos u otros directorios.',
          { h: 'Tipos de directorios' },
          { def: [
            ['/dev', 'contiene archivos especiales para dispositivos de E/S'],
            ['/etc', 'guarda archivos para la inicialización y gestión del sistema'],
            ['/home', 'incluye directorios para el inicio de sesión del usuario'],
            ['/usr', 'almacena lpp, include y otros directorios del sistema'],
            ['/bin', 'guarda los programas ejecutables del sistema']
          ] }
        ],
        ubuntu: [
          'El manual `hier(7)` de Ubuntu describe estos mismos directorios:',
          { def: [
            ['/dev', 'archivos especiales o de dispositivo, que representan dispositivos físicos.'],
            ['/etc', 'archivos de configuración propios de la máquina.'],
            ['/home', 'las carpetas personales de los usuarios. En Linux va en minúsculas.'],
            [
              '/usr',
              'datos compartibles y de solo lectura (programas, bibliotecas, encabezados en /usr/include). "lpp" no aparece en Ubuntu: es propio de AIX.'
            ],
            ['/bin', 'programas necesarios incluso en modo de un solo usuario.']
          ] },
          'Además, Ubuntu tiene `/var` (archivos que cambian de tamaño, como los registros), `/tmp` (temporales que se pueden borrar sin aviso) y `/proc` (información de los procesos y del núcleo).'
        ],
        fuentes: ['hier']
      },
      {
        titulo: 'Subdirectorios',
        veredicto: 'igual',
        af: [
          '**¿Qué es un subdirectorio?** Es el que organiza y administra archivos agrupándolos dentro de una jerarquía de directorios.',
          '**¿Dónde se guardan?** Las jerarquías se guardan en dispositivos de almacenamiento, ya sean HDD, SSD y en algunos casos USB.',
          { h: 'Sus beneficios' },
          { lista: [
            'Mejoran la eficiencia y productividad.',
            'Se organizan de manera intuitiva.',
            'Simplifican la información y el acceso a los datos.',
            'Se integran con motores de búsqueda, sistemas de respaldo y herramientas de gestión de archivos para facilitar el uso de datos.'
          ] }
        ],
        ubuntu: [
          'En Ubuntu todo forma un **solo árbol** que empieza en la raíz `/`. Un disco o una USB no recibe una letra como en Windows: se **monta** dentro de una carpeta del árbol.',
          'Según `hier(7)`, los medios extraíbles se montan en `/media` y los sistemas de archivos temporales en `/mnt`.'
        ],
        fuentes: ['hier']
      },
      {
        titulo: 'Ficheros y sistema de ficheros',
        veredicto: 'distinto',
        af: [
          '**¿Qué es?** Un fichero es un contenedor de información en el cual los datos dentro de él se pueden relacionar entre sí.',
          { h: 'Características' },
          { lista: [
            'Todo fichero tiene un nombre que sirve para identificarlo.',
            'Tiene una extensión, la cual da información sobre el contenido del fichero.',
            'El nombre del fichero es una cadena de texto y su extensión es una cadena de texto corta.'
          ] },
          { h: 'Sistema de ficheros' },
          'Es una estructura de datos encargada de los bloques y sectores en una partición de la unidad de almacenamiento. La parte del SO encargada de controlar este sistema se denomina **Gestor de Sistema de Ficheros**.'
        ],
        ubuntu: [
          { lista: [
            'En Linux la **extensión es solo parte del nombre**: el sistema no la necesita para abrir o ejecutar un archivo. Lo que decide si se puede ejecutar es el permiso de ejecución.',
            'Los nombres **distinguen mayúsculas y minúsculas**.',
            'Un nombre que empieza con punto es un archivo oculto.'
          ] },
          'El instalador oficial de Ubuntu, en su modo guiado sin LVM, crea una partición que cubre el disco y la formatea como **ext4**. La documentación del kernel explica que ext4 divide el sistema de archivos en **grupos de bloques** y guarda la información de cada archivo en **inodos**, con un diario (*journal*) para recuperarse de fallos.',
          'El "gestor de sistema de ficheros" de la AF corresponde al **VFS** del núcleo, que permite que ext4, FAT o NTFS convivan.'
        ],
        fuentes: ['instaladorGuiado', 'kExt4', 'kVfs']
      },
      {
        titulo: 'Manejo de recursos',
        veredicto: 'igual',
        af: [
          '"Los procesos realizan solicitudes de recursos. El sistema operativo recibe estas solicitudes y decide qué proceso puede utilizar cada recurso, cuánto puede utilizar y en qué momento. De esta manera busca que los recursos se aprovechen eficientemente y que los procesos puedan ejecutarse correctamente."',
          { h: 'Asigna recursos y controla su uso' },
          'Los procesos A, B y C hacen solicitudes; el sistema operativo **decide quién, cuánto y cuándo** usa la CPU, la memoria, la E/S y el disco.',
          'La decisión busca eficiencia, reparto razonable y ejecución estable.'
        ],
        ubuntu: [
          'Ubuntu responde a las tres preguntas de la AF:',
          { def: [
            ['¿Quién?', 'el planificador EEVDF decide qué proceso usa la CPU.'],
            [
              '¿Cuánto?',
              'los **cgroups** del núcleo organizan los procesos en jerarquía y reparten recursos como CPU y memoria de forma controlada. systemd los usa para cada servicio.'
            ],
            [
              '¿Cuándo?',
              'si falta memoria, **systemd-oomd** vigila la presión sobre los cgroups y toma medidas. Ubuntu Desktop lo incluye por defecto desde la 22.04.'
            ]
          ] }
        ],
        fuentes: ['kEevdf', 'kCgroup', 'oomd', 'notas2204']
      },
      {
        titulo: 'La estrategia cambia entre sistemas',
        veredicto: 'igual',
        af: [
          'Mismas responsabilidades; organización interna distinta.',
          { tabla: [
            ['Sistema', 'Estructura', 'Idea clave'],
            ['Linux', 'Núcleo monolítico + módulos cargables', 'flexibilidad'],
            ['Windows 10', 'Arquitectura híbrida + módulos', 'subsistemas'],
            ['macOS / iOS', 'Darwin = Mach + BSD', 'capas híbridas'],
            ['Android', 'Linux + HAL + frameworks', 'abstracción de hardware']
          ] },
          { tabla: [
            ['Sistema', '¿Qué hace?', '¿Cómo?'],
            ['Linux', 'Administra recursos', 'Con su propia estructura basada en el núcleo Linux'],
            ['Windows', 'Administra recursos', 'Mediante su arquitectura y componentes'],
            ['macOS/iOS', 'Administra recursos', 'Utilizando su estructura basada en Darwin'],
            ['Android', 'Administra recursos', 'Utiliza Linux como base y agrega componentes propios']
          ] },
          'La estructura elegida influye en cómo se incorporan servicios, controladores y políticas de gestión.'
        ],
        ubuntu: [
          'Ubuntu está en la fila de **Linux**: núcleo monolítico con módulos cargables. El manual de `modprobe` dice que la herramienta "agrega o quita un módulo del núcleo Linux" mientras el sistema funciona.',
          'Android y Ubuntu comparten el núcleo Linux, pero lo que va encima es distinto: Ubuntu usa systemd y un escritorio GNOME; Android usa ART, HAL y sus propios frameworks.'
        ],
        fuentes: ['modprobe', 'systemd', 'descargaDesktop']
      },
      {
        titulo: 'Clasificación por usuarios',
        veredicto: 'igual',
        af: [
          'El número de usuarios cambia las prioridades.',
          { def: [
            ['Monousuario', 'un usuario utiliza el sistema. Puede ejecutar varias tareas.'],
            ['Multitarea', 'describe programas simultáneos, no cantidad de usuarios.'],
            ['Multiusuario', 'varios usuarios comparten recursos. Requiere mayor control y protección.']
          ] },
          'La misión básica no cambia: asignar recursos y mantener separadas las actividades.',
          { h: 'Monousuario' },
          '**Usuario:** es una entidad (por lo general una persona, pero también un programa o servicio) que interactúa con la computadora.',
          '**Monousuario:** diseñado con la idea de ser destinado para el uso y tareas de una sola persona o usuario. Características: inicio de sesión mediante clave y orientado a uso personal.',
          'Ramas del monousuario:',
          { def: [
            ['Monotarea', 'permite la realización de una sola tarea por usuario a la vez.'],
            ['Multitarea', 'se refiere a la posibilidad de realizar más de una tarea simultáneamente.']
          ] },
          { h: 'Multiusuario' },
          'Dirigido principalmente a tareas que requieren más de un usuario a la vez; todos ellos se encuentran conectados a través de terminales que van directas al equipo. Sus características son:',
          { lista: [
            'Realizar diversas tareas a la vez.',
            'Brinda información a varios usuarios.',
            'Gestiona el uso de recursos.',
            'Fácil recuperación en caso de fallos.'
          ] }
        ],
        ubuntu: [
          'Ubuntu es **multiusuario y multitarea**:',
          { lista: [
            'Cada persona tiene su cuenta y su carpeta dentro de `/home`.',
            'La cuenta **root** existe, pero viene desactivada: tiene una contraseña que no coincide con ningún valor posible, así que no se puede iniciar sesión con ella.',
            'Los usuarios autorizados administran con `sudo` y su propia contraseña. Así cada acción queda asociada a quien la hizo. Desde Ubuntu 25.10 la implementación por defecto es **sudo-rs**.'
          ] }
        ],
        fuentes: ['usuarios', 'hier']
      },
      {
        titulo: 'Glosario básico',
        veredicto: 'igual',
        af: [
          { h: 'El vocabulario explica la ejecución' },
          { def: [
            ['Kernel / núcleo', 'programa central que permanece activo'],
            ['Proceso', 'programa en ejecución con estado y recursos'],
            ['Thread / hilo', 'unidad de ejecución dentro de un proceso'],
            ['CPU scheduling', 'selección del trabajo que usará la CPU'],
            ['Context switch', 'guardar un estado y restaurar otro'],
            ['System call', 'petición controlada de un servicio del núcleo']
          ] },
          { h: 'Memoria y almacenamiento tienen otro vocabulario' },
          { def: [
            ['Espacio de direcciones', 'vista lógica de la memoria de un proceso'],
            ['Memoria virtual', 'separa la memoria lógica de la física'],
            ['E/S', 'intercambio con dispositivos'],
            ['Device driver', 'traduce una interfaz uniforme al dispositivo'],
            ['Sistema de archivos', 'organiza y recupera datos persistentes'],
            ['Protección', 'controla el acceso a recursos']
          ] },
          'Los términos describen cómo el sistema abstrae, conserva y limita el uso de la información.',
          { h: 'La planificación mueve los procesos entre estados' },
          'El sistema decide qué proceso usa la CPU y cuándo debe cederla.',
          { def: [
            ['Ready / listo', 'preparado para usar la CPU'],
            ['Running / ejecución', 'instrucciones activas en el procesador'],
            ['Waiting / bloqueado', 'espera una operación o un evento'],
            ['Time slice / quantum', 'intervalo asignado antes de rotar'],
            ['Dispatcher', 'entrega la CPU al proceso elegido']
          ] },
          { h: 'Compartir datos exige coordinar los hilos' },
          { def: [
            ['Concurrencia', 'actividades que avanzan en periodos superpuestos'],
            ['Race condition', 'el resultado depende del orden de ejecución'],
            ['Critical section', 'código que accede a un recurso compartido'],
            ['Mutual exclusion', 'una ejecución a la vez en la sección crítica'],
            ['Lock / mutex', 'bloqueo que controla la entrada'],
            ['Semáforo', 'contador coordinado con wait y signal']
          ] },
          'Sin sincronización, el orden de ejecución puede cambiar el resultado.',
          { h: 'La memoria virtual traduce direcciones' },
          'El proceso usa direcciones virtuales; el sistema localiza los datos físicos.',
          { def: [
            ['Virtual address', 'dirección generada por el proceso'],
            ['Physical address', 'ubicación real en memoria principal'],
            ['Page / página', 'bloque fijo del espacio virtual'],
            ['Frame / marco', 'bloque fijo de memoria física'],
            ['Page table', 'relaciona páginas virtuales con marcos'],
            ['Page fault', 'la página solicitada no está en memoria']
          ] },
          { h: 'La protección define quién puede hacer qué y por qué' },
          { def: [
            ['Protection', 'controla el acceso a los recursos'],
            ['Domain', 'objetos y operaciones permitidas'],
            ['Object', 'recurso que debe protegerse'],
            ['Access right', 'operación autorizada sobre un objeto'],
            ['ACL', 'derechos asociados a un objeto'],
            ['Capacidad', 'derechos que conserva un dominio']
          ] },
          'Proteger es definir quién puede realizar qué operación sobre cada recurso.'
        ],
        ubuntu: [
          'Varios términos del glosario aparecen con el mismo significado en los manuales de Ubuntu:',
          { def: [
            ['System call', '"la interfaz fundamental entre una aplicación y el núcleo Linux" (syscalls).'],
            ['Proceso', 'cada uno tiene una carpeta /proc/PID con su información (proc).'],
            [
              'Estados',
              'ps muestra **R** (en ejecución o listo), **S** (dormido, esperando un evento), **D** (dormido sin interrupción, normalmente E/S), **T** (detenido) y **Z** (zombi: terminó pero su padre no lo ha recogido).'
            ],
            ['CPU scheduling', 'EEVDF desde Linux 6.6.'],
            ['Sistema de archivos', 'ext4, accesible a través del VFS.'],
            [
              'ACL',
              'getfacl muestra los permisos de dueño, grupo y otros, más las entradas extra de la ACL.'
            ],
            [
              'Capacidad',
              'Linux divide los privilegios del superusuario en unidades llamadas *capabilities*, como CAP_NET_ADMIN para operaciones de red.'
            ]
          ] }
        ],
        fuentes: ['syscalls', 'proc', 'ps', 'kEevdf', 'getfacl', 'capabilities']
      },
      {
        titulo: 'Partes del sistema',
        veredicto: 'igual',
        af: [
          'El núcleo es el centro, pero no es todo. Las capas, de arriba hacia abajo:',
          { pasos: [
            'Interfaces y aplicaciones',
            'Programas de sistema + middleware',
            'Interfaz de llamadas al sistema',
            'Kernel / núcleo (siempre activo)',
            'Hardware'
          ] },
          'Las capas superiores extienden los servicios y ofrecen formas de interacción.',
          { def: [
            [
              'Interfaces de usuario',
              'medios con los que el usuario da órdenes al sistema: intérprete de comandos o interfaz gráfica de usuario.'
            ],
            [
              'Aplicaciones',
              'software final que carece de permisos de hardware directo y depende por completo de las capas inferiores para cualquier operación de entrada/salida.'
            ],
            [
              'Programas de sistema',
              'herramientas y utilidades que facilitan el desarrollo y ejecución de programas (compiladores, enlazadores, cargadores, servicios en segundo plano).'
            ],
            [
              'Middleware',
              'capa de software que proporciona servicios compartidos a las aplicaciones (gestión de bases de datos, comunicación entre procesos distribuidos y marcos de trabajo de red) que no ofrece directamente el SO.'
            ],
            [
              'Interfaz de llamadas al sistema',
              'actúa como la barrera de seguridad que separa el modo usuario del modo núcleo. Traduce las peticiones del software de usuario en interrupciones por software (traps) o instrucciones de cambio de modo.'
            ],
            [
              'Kernel / núcleo',
              'opera en modo privilegiado o modo núcleo. Administra el tiempo de CPU, gestiona el espacio de direcciones de memoria, gestiona el almacenamiento y controla el tráfico de E/S.'
            ],
            [
              'Hardware',
              'proporciona los recursos físicos de cómputo (CPU, memoria principal RAM, discos, tarjetas de red y dispositivos de E/S). Es controlado de forma directa únicamente por el núcleo a través de controladores de dispositivos (drivers) e interrupciones de hardware.'
            ]
          ] }
        ],
        ubuntu: [
          'Las mismas capas, con nombres de Ubuntu:',
          { tabla: [
            ['Capa', 'En Ubuntu'],
            ['Interfaces', 'escritorio GNOME e intérprete de comandos en la terminal'],
            [
              'Programas de sistema',
              'systemd y sus servicios; systemd corre como PID 1 y levanta y mantiene los servicios'
            ],
            ['Llamadas al sistema', 'la interfaz entre las aplicaciones y el núcleo'],
            ['Núcleo', 'Linux 7.0 en Ubuntu 26.04'],
            ['Hardware', 'controlado por los drivers del núcleo']
          ] }
        ],
        fuentes: ['systemd', 'syscalls', 'descargaServer']
      },
      {
        titulo: 'Arquitecturas del núcleo',
        veredicto: 'distinto',
        af: [
          'La arquitectura organiza el núcleo. Las funciones pueden concentrarse, separarse por capas o incorporarse mediante módulos.',
          { def: [
            [
              'Monolítica',
              'todo el sistema operativo se compila como un único ejecutable que corre en modo núcleo. Los componentes interactúan mediante llamadas a funciones directas. Ejemplos: MS-DOS y UNIX.'
            ],
            [
              'Por capas',
              'el sistema operativo se divide en un conjunto de niveles jerárquicos. La capa 0 es el hardware y la capa N es la interfaz de usuario. Ejemplo: sistema experimental "THE".'
            ],
            [
              'Micronúcleo',
              'elimina todo el código no esencial del núcleo. Solo mantiene la comunicación entre procesos (IPC), la gestión básica de memoria y la planificación primaria. Ejemplos: Mach, MINIX y QNX.'
            ],
            [
              'Modular',
              'un núcleo central que define interfaces estándar, pero carga y descarga módulos dinámicamente en tiempo de ejecución según se necesiten (por ejemplo, al conectar un nuevo hardware o montar un sistema de archivos especial). Ejemplo: Solaris.'
            ],
            [
              'Híbrida',
              'estructura comercial que combina las mejores características de varias arquitecturas: adopta la velocidad monolítica para servicios críticos de E/S y rendimiento junto con la organización por capas o servicios del micronúcleo. Ejemplos: Windows NT y macOS.'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu no encaja en una sola fila: su núcleo es **monolítico** (el planificador, la memoria, los sistemas de archivos y la red corren juntos en modo núcleo) y a la vez **modular**, porque los módulos se agregan o quitan en funcionamiento con `modprobe`, como en el ejemplo de la AF de conectar hardware nuevo.'
        ],
        fuentes: ['modprobe', 'kernelDocs']
      },
      {
        titulo: 'Partes de gestión: procesos',
        veredicto: 'igual',
        af: [
          'Gestionar es registrar, asignar y proteger.',
          { def: [
            ['Procesos', 'crear · planificar · comunicar'],
            ['Memoria', 'registrar · asignar · liberar'],
            ['Archivos', 'nombrar · organizar · proteger'],
            ['E/S', 'abstraer · transferir · coordinar'],
            ['Almacenamiento', 'asignar · recuperar · programar']
          ] },
          { nota: 'La protección atraviesa todas las áreas.' },
          { h: 'Gestión de procesos' },
          'Es la función del sistema operativo encargada de administrar los programas que se están ejecutando.',
          { lista: [
            'El sistema operativo crea y elimina procesos.',
            'Decide qué procesos utilizan el procesador y durante cuánto tiempo.',
            'Permite que varios procesos funcionen al mismo tiempo.',
            'Coordina la comunicación entre diferentes procesos.'
          ] }
        ],
        ubuntu: [
          'El primer proceso de Ubuntu es **systemd**: al arrancar corre como PID 1, hace de sistema de inicio y levanta y mantiene los servicios. Los demás procesos descienden de él.',
          'El tiempo de CPU lo reparte el planificador del núcleo. Para tareas urgentes existen políticas de tiempo real (SCHED_FIFO y SCHED_RR) con prioridades del 1 al 99.'
        ],
        fuentes: ['systemd', 'sched']
      },
      {
        titulo: 'Gestión de memoria',
        veredicto: 'igual',
        af: [
          'Es la función que controla cómo se utiliza la memoria principal (RAM) del computador.',
          { lista: [
            'Determina la memoria que cada programa necesita.',
            'Asigna espacio de memoria a los procesos.',
            'Controla las partes de la memoria que estarán ocupadas y las que estarán disponibles.',
            'Libera la memoria cuando un programa termina.',
            'Puede usar memoria virtual cuando la RAM no es suficiente.'
          ] },
          { nota: 'La protección atraviesa todas las áreas.' }
        ],
        ubuntu: [
          'El manual de `free` en Ubuntu distingue la memoria **libre** (sin usar) de la **disponible**: una estimación de cuánta memoria hay para abrir aplicaciones nuevas sin recurrir al intercambio. La diferencia es la caché (buff/cache), que el sistema reutiliza cuando hace falta.',
          'Para la memoria virtual, el instalador de Ubuntu crea por defecto un **archivo de intercambio** llamado `/swap.img`, de tamaño calculado automáticamente (hasta 8 GB).',
          'Si la memoria se agota, **systemd-oomd** actúa sobre los procesos según la presión de memoria.'
        ],
        fuentes: ['free', 'curtinSwap', 'oomd']
      },
      {
        titulo: 'Gestión de archivos y almacenamiento',
        veredicto: 'igual',
        af: [
          { h: 'Gestión de archivos' },
          { lista: [
            'Crea, elimina y modifica archivos.',
            'Organiza archivos por carpetas y directorios.',
            'Controla nombres, ubicaciones y extensiones.',
            'Establece permisos para determinar quiénes pueden acceder a qué archivos.'
          ] },
          { h: 'Gestión de almacenamiento' },
          { lista: [
            'Administración del espacio disponible en discos y unidades.',
            'Decide dónde guardar los datos.',
            'Permite localizar y recuperar información.',
            'Organiza la lectura y escritura de datos.'
          ] },
          { nota: 'La protección atraviesa todas las áreas.' }
        ],
        ubuntu: [
          { h: 'Archivos' },
          'Cada archivo tiene dueño, grupo y permisos, que se amplían con ACL.',
          { h: 'Almacenamiento' },
          'En una instalación automática de Ubuntu con un solo disco, el almacenamiento usa por defecto el esquema **LVM** (volúmenes lógicos que se pueden redimensionar). También ofrece los esquemas *direct* y **ZFS**.'
        ],
        fuentes: ['getfacl', 'autoinstall']
      },
      {
        titulo: 'Gestión de E/S',
        veredicto: 'igual',
        af: [
          'La gestión de entrada/salida (E/S) permite la comunicación entre el sistema operativo y los dispositivos.',
          { lista: [
            'Controla dispositivos.',
            'Transfiere datos.',
            'Coordina operaciones.',
            'Utiliza controladores.',
            'Funciona mediante drivers.'
          ] },
          'El sistema operativo funciona como mediador entre la computadora y los dispositivos externos.',
          { nota: 'La protección atraviesa todas las áreas.' }
        ],
        ubuntu: [
          'Cuando se conecta un dispositivo, **udev** administra sus archivos en `/dev` y sus permisos.',
          'La mayoría de los controladores vienen con el núcleo. Los propietarios, como los de NVIDIA, se instalan con la herramienta oficial `ubuntu-drivers`.'
        ],
        fuentes: ['udev', 'nvidia']
      },
      {
        titulo: 'Ordenadores y móviles',
        veredicto: 'distinto',
        af: [
          { h: 'El escritorio admite arquitecturas distintas' },
          { def: [
            ['Linux', 'núcleo monolítico modular. Servicios del núcleo y módulos cargables (módulos).'],
            ['Windows 10', 'arquitectura híbrida. Subsistemas y módulos del núcleo (subsistemas).'],
            ['macOS', 'Darwin: Mach + BSD. Capas de experiencia, frameworks y kernel (capas híbridas).']
          ] },
          'Los tres ofrecen servicios equivalentes al usuario, pero distribuyen responsabilidades internas de manera diferente.',
          { h: 'iOS y Android responden al entorno móvil' },
          { def: [
            [
              'iOS (Darwin + Cocoa Touch)',
              'interfaz diseñada para tacto; arquitecturas ARM; gestión intensa de energía y memoria; ajustes de seguridad más estrictos.'
            ],
            [
              'Android (Linux + ART + HAL)',
              'frameworks y bibliotecas nativas; la HAL abstrae cámaras y sensores; portabilidad entre fabricantes; núcleo adaptado a energía, memoria e IPC.'
            ]
          ] },
          'Comparten la misión del escritorio, pero adaptan capas y políticas a restricciones móviles.'
        ],
        ubuntu: [
          'Ubuntu es la fila **Linux** del escritorio, y Ubuntu Server se publica para varias arquitecturas: x86 de 64 bits, ARM de 64 bits, IBM Z, IBM POWER y RISC-V. También hay imágenes para Raspberry Pi.',
          'En móviles Canonical ya no participa: **Ubuntu Touch** nació del proyecto Ubuntu Phone de Canonical y hoy lo mantiene la comunidad sin fines de lucro **UBports**.'
        ],
        fuentes: ['descargaServer', 'ubports']
      },
      {
        titulo: 'Categorías según su uso y plataforma',
        veredicto: 'igual',
        af: [
          { def: [
            ['Escritorio', 'para computadoras personales. Ejemplos: Windows, macOS, Linux.'],
            ['Móviles', 'para teléfonos y tabletas. Ejemplos: Android, iOS.'],
            ['Servidores', 'gestionan equipos de alto rendimiento y servicios en red.'],
            [
              'Por lotes',
              'procesan trabajos en grupos, sin intervención del usuario (antiguos, pero aún usados en mainframes).'
            ],
            [
              'Tiempo real',
              'priorizan tareas urgentes (ej. sistemas médicos, automotrices). Garantizan respuesta inmediata.'
            ],
            ['Distribuidos', 'coordinan varias computadoras interconectadas como si fueran una sola.']
          ] },
          'La categoría cambia; la misión permanece: abstraer, asignar y controlar.'
        ],
        ubuntu: [
          'Ubuntu aparece en casi todas las categorías:',
          { tabla: [
            ['Categoría', 'Ubuntu'],
            ['Escritorio', 'Ubuntu Desktop'],
            [
              'Servidores',
              'Ubuntu Server, con imágenes certificadas en AWS, Azure, Google Cloud, IBM Cloud y Oracle Cloud'
            ],
            ['Tiempo real', 'Real-time Ubuntu, con núcleo PREEMPT_RT'],
            ['Distribuidos', 'clústeres de Kubernetes con MicroK8s'],
            ['Embebidos / IoT', 'Ubuntu Core, un sistema mínimo, seguro e inmutable']
          ] },
          'Para teléfonos no hay una edición oficial (ver "Ordenadores y móviles").'
        ],
        fuentes: ['nube', 'realtime', 'kubernetes', 'core']
      },
      {
        titulo: 'Criterios de clasificación',
        veredicto: 'igual',
        af: [
          'Estos criterios nos ayudan a elegir el SO adecuado según las necesidades del proyecto o del usuario.',
          { tabla: [
            ['Criterio', 'Tipos'],
            ['Número de usuarios', 'Monousuario / Multiusuario'],
            ['Número de tareas', 'Monotarea (un programa a la vez) / Multitarea'],
            ['Arquitectura interna', 'Monolítico, por capas, microkernel, máquina virtual'],
            ['Tiempo de respuesta', 'Tiempo real, tiempo compartido, por lotes'],
            ['Plataforma de destino', 'Escritorio, móvil, servidor, embebido (IoT, electrodomésticos)']
          ] }
        ],
        ubuntu: [
          'Ubuntu con la tabla de la AF:',
          { tabla: [
            ['Criterio', 'Ubuntu'],
            ['Número de usuarios', 'Multiusuario'],
            ['Número de tareas', 'Multitarea'],
            ['Arquitectura interna', 'Monolítico con módulos'],
            ['Tiempo de respuesta', 'Tiempo compartido; tiempo real con Real-time Ubuntu'],
            ['Plataforma', 'Escritorio, servidor, nube y embebido']
          ] },
          'También funciona como **máquina virtual**: puede alojar máquinas virtuales con QEMU/KVM y libvirt, y correr dentro de Windows con WSL.'
        ],
        fuentes: ['realtime', 'core', 'libvirt', 'wsl']
      },
      {
        titulo: 'Sistemas operativos en tiempo real',
        veredicto: 'distinto',
        af: [
          'A diferencia de un sistema operativo común (como Windows o Android), que busca que todo funcione de manera fluida en general, un RTOS garantiza responder a un evento en un tiempo exacto y predecible (en microsegundos o milisegundos).',
          { h: 'Tipos de tiempo' },
          { def: [
            [
              'Tiempo real estricto',
              'si el sistema no responde dentro del límite de tiempo, ocurre un fallo grave o catastrófico.'
            ],
            [
              'Tiempo real flexible',
              'un retraso ocasional degrada la calidad, pero no causa un fallo crítico (ej. transmisión de video en vivo).'
            ]
          ] },
          { h: 'Ejemplos prácticos y cotidianos' },
          { def: [
            ['Automoción', 'sistemas de frenos ABS y control de bolsas de aire.'],
            ['Medicina', 'monitores cardiacos y marcapasos.'],
            ['Aeroespacial', 'sistemas de navegación en aviones y cohetes.']
          ] }
        ],
        ubuntu: [
          'El Ubuntu normal es un sistema de propósito general. Para tiempo real, Canonical ofrece **Real-time Ubuntu**, que es Ubuntu con un núcleo de tiempo real (**PREEMPT_RT**). Lo dirige a la industria, las telecomunicaciones, la automoción y la robótica médica.',
          'Las aplicaciones pueden pedir políticas de tiempo real (SCHED_FIFO, SCHED_RR) con prioridades del 1 al 99.'
        ],
        fuentes: ['realtime', 'sched']
      },
      {
        titulo: 'El sistema operativo como gobierno',
        veredicto: 'igual',
        af: [
          'Para entender un sistema operativo (SO), debemos abandonar la idea de que es una herramienta que "hace" algo por sí misma. Como bien señala Silberschatz, un sistema operativo es similar a un gobierno: no produce un producto final útil (como un poema o un cálculo), sino que simplemente proporciona el entorno dentro del cual otros programas pueden realizar su labor de manera productiva. Es el árbitro invisible que asegura que el caos del hardware se transforme en orden para el usuario.',
          { h: 'El Estado digital (definición y propósito)' },
          'Imaginemos que su computadora es un país. El hardware son las tierras y materias primas, las aplicaciones son los ciudadanos que quieren trabajar, y el sistema operativo es el gobierno. Técnicamente, el SO es el software que gestiona el hardware, actuando como un intermediario esencial entre el usuario y la maquinaria física. Su función principal no es ejecutar tareas, sino ofrecer una base estable para que las aplicaciones (los programas de usuario) florezcan sin interferir unas con otras.',
          { h: 'El administrador de bienes públicos (gestión de recursos)' },
          'Desde la perspectiva de Stallings y Tanenbaum, el SO es el administrador de recursos supremo. Como un gobierno que asigna presupuestos y terrenos, el sistema operativo debe decidir quién recibe qué recurso, cuánto y por cuánto tiempo.',
          { def: [
            [
              'Multiplexaje en el tiempo',
              'decide qué "ciudadano" (proceso) usa el procesador en cada milisegundo.'
            ],
            [
              'Multiplexaje en el espacio',
              'divide la memoria principal para que varios programas residan en ella simultáneamente, asegurando que cada uno tenga su propio "terreno" privado.'
            ]
          ] },
          { h: 'Los ministerios de gestión (componentes y funciones)' },
          'Un gobierno funciona a través de departamentos especializados; el sistema operativo hace lo propio mediante sus subsistemas:',
          { def: [
            [
              'Ministerio de Trabajo',
              'gestión de procesos: crea, planifica y termina las unidades de actividad del sistema.'
            ],
            [
              'Ministerio de Vivienda',
              'gestión de memoria: controla qué partes de la RAM están ocupadas y asigna espacio a los procesos que lo necesitan.'
            ],
            [
              'Ministerio de Comunicaciones y E/S',
              'traduce los deseos de las aplicaciones en señales para periféricos como discos e impresoras.'
            ],
            [
              'Guardia Civil',
              'seguridad y protección: asegura que ningún proceso acceda a datos que no le pertenecen, garantizando la confidencialidad e integridad del Estado.'
            ]
          ] },
          { h: 'El horizonte de la nación (conclusión y objetivos)' },
          'Para que un gobierno sea exitoso, Stallings dicta que debe cumplir tres objetivos: facilidad de uso (hacer el equipo utilizable), eficiencia (aprovechar al máximo los recursos) y capacidad de evolucionar (admitir nuevas funciones sin destruirse). En última instancia, el sistema operativo es la estructura invisible que transforma piezas físicas de cómputo en herramientas dinámicas y seguras, permitiendo que la magia digital parezca sencilla a los ojos del ser humano.'
        ],
        ubuntu: [
          'La analogía del gobierno se aplica directamente a Ubuntu:',
          { def: [
            ['Gobierno', 'el núcleo Linux.'],
            [
              'Autoridad',
              'root existe pero está desactivado; los usuarios autorizados actúan con sudo y cada acción queda registrada a su nombre.'
            ],
            ['Ministerio de Trabajo', 'el planificador y systemd (PID 1).'],
            ['Ministerio de Vivienda', 'la gestión de memoria y el intercambio.'],
            [
              'Guardia Civil',
              'los permisos, las capabilities y AppArmor, que restringe a las aplicaciones con control de acceso obligatorio y está instalado y cargado por defecto.'
            ]
          ] },
          'La "capacidad de evolucionar" de Stallings se ve en el calendario: versiones cada seis meses y LTS cada dos años.'
        ],
        fuentes: ['usuarios', 'systemd', 'apparmor', 'releaseCycle']
      }
    ]
  },
  { id: 'AF2', title: 'La concurrencia en los sistemas operativos', temas: [] },
  { id: 'AF3', title: 'Almacenaje, memoria y archivos', temas: [] },
  { id: 'AF4', title: 'Redes y seguridad en sistemas distribuidos', temas: [] }
];
