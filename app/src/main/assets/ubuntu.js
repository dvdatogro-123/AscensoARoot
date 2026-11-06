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
  kExt4: ['Kernel Linux · ext4', 'https://docs.kernel.org/filesystems/ext4/overview.html'],
  fork: ['Manual de Ubuntu · fork(2)', 'https://manpages.ubuntu.com/manpages/noble/man2/fork.2.html'],
  pthreads: ['Manual de Ubuntu · pthreads(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/pthreads.7.html'],
  semOverview: [
    'Manual de Ubuntu · sem_overview(7)',
    'https://manpages.ubuntu.com/manpages/noble/man7/sem_overview.7.html'
  ],
  futex: ['Manual de Ubuntu · futex(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/futex.7.html'],
  mutexPosix: [
    'Manual de Ubuntu · pthread_mutex_lock(3)',
    'https://manpages.ubuntu.com/manpages/noble/man3/pthread_mutex_lock.3posix.html'
  ],
  rwlock: [
    'Manual de Ubuntu · pthread_rwlock_rdlock(3)',
    'https://manpages.ubuntu.com/manpages/noble/man3/pthread_rwlock_rdlock.3posix.html'
  ],
  condWait: [
    'Manual de Ubuntu · pthread_cond_timedwait(3)',
    'https://manpages.ubuntu.com/manpages/noble/man3/pthread_cond_timedwait.3posix.html'
  ],
  condSignal: [
    'Manual de Ubuntu · pthread_cond_signal(3)',
    'https://manpages.ubuntu.com/manpages/noble/man3/pthread_cond_signal.3posix.html'
  ],
  barrier: [
    'Manual de Ubuntu · pthread_barrier_wait(3)',
    'https://manpages.ubuntu.com/manpages/noble/man3/pthread_barrier_wait.3posix.html'
  ],
  mq: ['Manual de Ubuntu · mq_overview(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/mq_overview.7.html'],
  pipe: ['Manual de Ubuntu · pipe(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/pipe.7.html'],
  unixSock: ['Manual de Ubuntu · unix(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/unix.7.html'],
  dbus: ['Manual de Ubuntu · dbus-daemon(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/dbus-daemon.1.html'],
  nproc: ['Manual de Ubuntu · nproc(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/nproc.1.html'],
  taskset: ['Manual de Ubuntu · taskset(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/taskset.1.html'],
  make: ['Manual de Ubuntu · make(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/make.1.html'],
  gcc: ['Manual de Ubuntu · gcc(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/gcc.1.html'],
  bash: ['Manual de Ubuntu · bash(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/bash.1.html'],
  flock: ['Manual de Ubuntu · flock(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/flock.1.html'],
  fcntl: ['Manual de Ubuntu · fcntl(2)', 'https://manpages.ubuntu.com/manpages/noble/man2/fcntl.2.html'],
  aptGet: ['Manual de Ubuntu · apt-get(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/apt-get.8.html'],
  dpkg: ['Manual de Ubuntu · dpkg(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/dpkg.1.html'],
  cupsServer: [
    'Ubuntu Server · Servidor de impresión CUPS',
    'https://ubuntu.com/server/docs/how-to/networking/cups-print-server/'
  ],
  cupsd: ['Manual de Ubuntu · cupsd(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/cupsd.8.html'],
  kMutex: ['Kernel Linux · Diseño de mutex', 'https://docs.kernel.org/locking/mutex-design.html'],
  kLockdep: ['Kernel Linux · Validador de bloqueos (lockdep)', 'https://docs.kernel.org/locking/lockdep-design.html'],
  kMmConceptos: ['Kernel Linux · Conceptos de gestión de memoria', 'https://docs.kernel.org/admin-guide/mm/concepts.html'],
  kMglru: ['Kernel Linux · Multi-Gen LRU', 'https://docs.kernel.org/admin-guide/mm/multigen_lru.html'],
  kZram: ['Kernel Linux · zram', 'https://docs.kernel.org/admin-guide/blockdev/zram.html'],
  kF2fs: ['Kernel Linux · F2FS', 'https://docs.kernel.org/filesystems/f2fs.html'],
  kNtfs3: ['Kernel Linux · NTFS3', 'https://docs.kernel.org/filesystems/ntfs3.html'],
  kVmSysctl: [
    'Kernel Linux · Parámetros de memoria (/proc/sys/vm)',
    'https://docs.kernel.org/admin-guide/sysctl/vm.html'
  ],
  kExt4Grupos: ['Kernel Linux · ext4: grupos de bloques', 'https://docs.kernel.org/filesystems/ext4/blockgroup.html'],
  kZonas: ['Kernel Linux · Memoria física y zonas', 'https://docs.kernel.org/mm/physical_memory.html'],
  buddyinfo: [
    'Manual de Ubuntu · proc_buddyinfo(5)',
    'https://manpages.ubuntu.com/manpages/noble/man5/proc_buddyinfo.5.html'
  ],
  slabtop: ['Manual de Ubuntu · slabtop(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/slabtop.1.html'],
  mprotect: ['Manual de Ubuntu · mprotect(2)', 'https://manpages.ubuntu.com/manpages/noble/man2/mprotect.2.html'],
  malloc: ['Manual de Ubuntu · malloc(3)', 'https://manpages.ubuntu.com/manpages/noble/man3/malloc.3.html'],
  ldso: ['Manual de Ubuntu · ld.so(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/ld.so.8.html'],
  cp: ['Manual de Ubuntu · cp(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/cp.1.html'],
  link: ['Manual de Ubuntu · link(2)', 'https://manpages.ubuntu.com/manpages/noble/man2/link.2.html'],
  e4defrag: ['Manual de Ubuntu · e4defrag(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/e4defrag.8.html'],
  cryptsetup: ['Manual de Ubuntu · cryptsetup(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/cryptsetup.8.html'],
  nfs: ['Ubuntu Server · NFS', 'https://ubuntu.com/server/docs/how-to/networking/install-nfs/'],
  samba: ['Ubuntu Server · Introducción a Samba', 'https://ubuntu.com/server/docs/explanation/intro-to/samba/'],
  lvm: ['Ubuntu Server · LVM', 'https://ubuntu.com/server/docs/explanation/storage/about-lvm/'],
  notas2404: ['Ubuntu · Notas de la versión 24.04 LTS', 'https://documentation.ubuntu.com/release-notes/24.04/'],
  tutorialInstalar: ['Ubuntu · Tutorial: instalar Ubuntu Desktop', 'https://ubuntu.com/tutorials/install-ubuntu-desktop'],
  tcp: ['Manual de Ubuntu · tcp(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/tcp.7.html'],
  udp: ['Manual de Ubuntu · udp(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/udp.7.html'],
  ipv4: ['Manual de Ubuntu · ip(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/ip.7.html'],
  ipv6: ['Manual de Ubuntu · ipv6(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/ipv6.7.html'],
  socket: ['Manual de Ubuntu · socket(2)', 'https://manpages.ubuntu.com/manpages/noble/man2/socket.2.html'],
  raw: ['Manual de Ubuntu · raw(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/raw.7.html'],
  services: ['Manual de Ubuntu · services(5)', 'https://manpages.ubuntu.com/manpages/noble/man5/services.5.html'],
  ss: ['Manual de Ubuntu · ss(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/ss.8.html'],
  rpcbind: ['Manual de Ubuntu · rpcbind(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/rpcbind.8.html'],
  xdr: ['Manual de Ubuntu · xdr(3)', 'https://manpages.ubuntu.com/manpages/noble/man3/xdr.3.html'],
  aptSecure: ['Manual de Ubuntu · apt-secure(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/apt-secure.8.html'],
  shadow: ['Manual de Ubuntu · shadow(5)', 'https://manpages.ubuntu.com/manpages/noble/man5/shadow.5.html'],
  sha256sum: ['Manual de Ubuntu · sha256sum(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/sha256sum.1.html'],
  sshKeygen: ['Manual de Ubuntu · ssh-keygen(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/ssh-keygen.1.html'],
  gpg: ['Manual de Ubuntu · gpg(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/gpg.1.html'],
  auditd: ['Manual de Ubuntu · auditd(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/auditd.8.html'],
  credentials: ['Manual de Ubuntu · credentials(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/credentials.7.html'],
  ufw: ['Manual de Ubuntu · ufw(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/ufw.8.html'],
  faillock: ['Manual de Ubuntu · faillock(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/faillock.8.html'],
  pam: ['Manual de Ubuntu · pam(7)', 'https://manpages.ubuntu.com/manpages/noble/man7/pam.7.html'],
  netplan: ['Ubuntu Server · Netplan', 'https://ubuntu.com/server/docs/explanation/networking/about-netplan/'],
  firewall: ['Ubuntu Server · Firewall (ufw)', 'https://ubuntu.com/server/docs/how-to/security/firewalls/'],
  sugerencias: [
    'Ubuntu Server · Sugerencias de seguridad',
    'https://ubuntu.com/server/docs/explanation/security/security_suggestions/'
  ],
  openssh: ['Ubuntu Server · Servidor OpenSSH', 'https://ubuntu.com/server/docs/how-to/security/openssh-server/'],
  totp: [
    'Ubuntu Server · Doble factor con TOTP/HOTP',
    'https://ubuntu.com/server/docs/how-to/security/two-factor-authentication-with-totp-or-hotp/'
  ],
  fido: [
    'Ubuntu Server · Doble factor con U2F/FIDO',
    'https://ubuntu.com/server/docs/how-to/security/two-factor-authentication-with-u2f-or-fido/'
  ],
  smartcard: [
    'Ubuntu Server · Autenticación con tarjeta inteligente',
    'https://ubuntu.com/server/docs/how-to/security/smart-card-authentication/'
  ],
  ftp: ['Ubuntu Server · Servidor FTP', 'https://ubuntu.com/server/docs/how-to/networking/ftp/'],
  postfix: [
    'Ubuntu Server · Postfix (correo)',
    'https://ubuntu.com/server/docs/how-to/mail-services/install-postfix/'
  ],
  ha: [
    'Ubuntu Server · Alta disponibilidad',
    'https://ubuntu.com/server/docs/explanation/intro-to/high-availability/'
  ],
  squid: [
    'Ubuntu Server · Proxy Squid',
    'https://ubuntu.com/server/docs/explanation/web-services/about-squid-proxy-servers/'
  ],
  cryptoLibs: [
    'Ubuntu Server · Bibliotecas criptográficas',
    'https://ubuntu.com/server/docs/explanation/intro-to/crypto-libraries/'
  ],
  sids: [
    'Ubuntu Server · Identificadores de seguridad (SID)',
    'https://ubuntu.com/server/docs/explanation/active-directory/security-identifiers-sids/'
  ],
  sssd: ['Ubuntu Server · SSSD', 'https://ubuntu.com/server/docs/explanation/intro-to/sssd/'],
  kerberos: ['Ubuntu Server · Kerberos', 'https://ubuntu.com/server/docs/explanation/intro-to/kerberos/'],
  clevis: [
    'Ubuntu Server · Descifrado LUKS con TPM',
    'https://ubuntu.com/server/docs/how-to/security/tpm-backed-luks-decryption-with-clevis/'
  ],
  actualizaciones: [
    'Ubuntu Server · Actualizaciones automáticas',
    'https://ubuntu.com/server/docs/how-to/software/automatic-updates/'
  ],
  aslr: [
    'Seguridad de Ubuntu · ASLR',
    'https://documentation.ubuntu.com/security/security-features/process-memory/aslr/'
  ],
  banderas: [
    'Seguridad de Ubuntu · Banderas del compilador',
    'https://documentation.ubuntu.com/security/security-features/process-memory/compiler-flags/'
  ],
  puertos: [
    'Seguridad de Ubuntu · Sin puertos abiertos',
    'https://documentation.ubuntu.com/security/security-features/network/open-ports/'
  ],
  hashing: [
    'Seguridad de Ubuntu · Hash de contraseñas',
    'https://documentation.ubuntu.com/security/security-features/cryptography/password-hashing/'
  ],
  secureBoot: [
    'Seguridad de Ubuntu · UEFI Secure Boot',
    'https://documentation.ubuntu.com/security/security-features/platform-protections/secure-boot/'
  ],
  tpm: [
    'Seguridad de Ubuntu · Trusted Platform Module',
    'https://documentation.ubuntu.com/security/security-features/platform-protections/trusted-platform-module/'
  ],
  synCookies: [
    'Seguridad de Ubuntu · SYN cookies',
    'https://documentation.ubuntu.com/security/security-features/network/syn-cookies/'
  ],
  livepatch: ['Ubuntu · Livepatch', 'https://ubuntu.com/security/livepatch'],
  verificarIso: ['Ubuntu · Tutorial: verificar la imagen de Ubuntu', 'https://ubuntu.com/tutorials/how-to-verify-ubuntu'],
  kLsm: ['Kernel Linux · Módulos de seguridad (LSM)', 'https://docs.kernel.org/admin-guide/LSM/index.html'],
  kApparmor: ['Kernel Linux · AppArmor', 'https://docs.kernel.org/admin-guide/LSM/apparmor.html'],
  respaldos: ['Ubuntu Server · Respaldos', 'https://ubuntu.com/server/docs/how-to/backups/'],
  kSkbuff: ['Kernel Linux · struct sk_buff', 'https://docs.kernel.org/networking/skbuff.html']
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
  {
    id: 'AF2',
    title: 'La concurrencia en los sistemas operativos',
    temas: [
      {
        titulo: 'Introducción',
        veredicto: 'igual',
        af: [
          'En la actualidad, las computadoras, los teléfonos celulares y otros dispositivos electrónicos forman parte de nuestra vida diaria y nos permiten realizar muchas actividades al mismo tiempo. Para que estos dispositivos funcionen de manera eficiente, los sistemas operativos administran los recursos del equipo y organizan la ejecución de los procesos.',
          'En este contexto, la concurrencia es un concepto fundamental, ya que permite ejecutar varias tareas de forma organizada y contribuye al buen funcionamiento del sistema. Comprender este concepto es importante para conocer cómo los sistemas operativos coordinan los procesos y mejoran el rendimiento de las aplicaciones que utilizamos todos los días.'
        ],
        ubuntu: [
          'Ubuntu es un sistema **multitarea**: el núcleo Linux reparte el procesador entre todos los procesos y hilos. Desde Linux 6.6 el planificador por defecto es **EEVDF**, que sustituyó al anterior CFS.',
          'Para coordinar procesos que comparten datos, Ubuntu ofrece a los programas las herramientas clásicas de la concurrencia: hilos POSIX, semáforos, mutex, variables de condición, colas de mensajes y tuberías. Todas se ven en los siguientes subtemas.'
        ],
        fuentes: ['kEevdf', 'pthreads', 'semOverview']
      },
      {
        titulo: '¿Qué es la concurrencia?',
        veredicto: 'igual',
        af: [
          'La concurrencia es la capacidad de un sistema operativo para ejecutar dos o más procesos o hilos al mismo tiempo. En un solo núcleo, la CPU cambia rápidamente entre procesos, mientras que en varios núcleos estos pueden ejecutarse de forma simultánea.'
        ],
        ubuntu: [
          'Ubuntu hace las dos cosas que describe la AF:',
          { def: [
            [
              'Un núcleo',
              'el planificador alterna los procesos en el procesador, dando a cada uno porciones de tiempo.'
            ],
            [
              'Varios núcleos',
              'los procesos corren de verdad al mismo tiempo, uno por núcleo. El comando `nproc` muestra cuántas unidades de procesamiento hay disponibles.'
            ]
          ] },
          'También se puede fijar en qué núcleos corre un proceso: la **afinidad de CPU** "une" un proceso a un conjunto de CPU, y el planificador de Linux la respeta (comando `taskset`).'
        ],
        fuentes: ['nproc', 'taskset', 'sched']
      },
      {
        titulo: 'Objetivos de la concurrencia',
        veredicto: 'igual',
        af: [
          { h: 'Maximizar el uso de recursos y el rendimiento' },
          'El hardware (CPU, memoria, dispositivos de entrada/salida) es un recurso limitado y costoso. La concurrencia permite solapar el cómputo de la CPU con las operaciones de E/S. Mientras un proceso espera a que concluya una lectura/escritura en disco o red, la CPU se asigna a otro proceso activo, evitando tiempos muertos del procesador.',
          { h: 'Aumentar la interactividad y la capacidad de respuesta' },
          'La concurrencia asegura que el usuario pueda seguir interactuando con la interfaz gráfica o las aplicaciones en primer plano (por ejemplo, escribir en un editor de texto) mientras el sistema procesa tareas extensas en segundo plano (por ejemplo, descargar un archivo o compilar código).'
        ],
        ubuntu: [
          { h: 'Solapar CPU y E/S' },
          'En Ubuntu se ve en el estado de los procesos: el manual de `ps` llama **D** al proceso en "espera no interrumpible (normalmente E/S)". Mientras un proceso está en D, el planificador da la CPU a los procesos en estado R (listos).',
          { h: 'Primer y segundo plano' },
          'La terminal de Ubuntu (Bash) permite justo el ejemplo de la AF: si un comando termina con `&`, el shell lo ejecuta en segundo plano y no espera a que acabe, así que se puede seguir trabajando.',
          { cmd: [['make -j4 &', 'compila en segundo plano con 4 trabajos a la vez']] }
        ],
        fuentes: ['ps', 'bash', 'make']
      },
      {
        titulo: 'Fases de la concurrencia (estados)',
        veredicto: 'distinto',
        af: [
          'Los procesos pueden cambiar de estado varias veces antes de terminar:',
          { def: [
            [
              '1 · Nuevo',
              'el proceso acaba de ser creado por el sistema operativo y está siendo preparado para ejecutarse. Ejemplo: al abrir un programa como Google Chrome, el sistema operativo crea el proceso y lo prepara.'
            ],
            [
              '2 · Listo',
              'el proceso ya está preparado para ejecutarse, pero está esperando que la CPU esté disponible. Ejemplo: tener abiertos Word, Excel y Spotify; ya están listos para ejecutarse, pero esperan su turno para usar la CPU.'
            ],
            [
              '3 · Ejecución',
              'el proceso está utilizando la CPU, que se encuentra ejecutando sus instrucciones. Ejemplo: estar escribiendo en Microsoft Word; la CPU está ejecutando las instrucciones para mostrar lo que escribes.'
            ],
            [
              '4 · Bloqueado o en espera',
              'el proceso no puede continuar temporalmente porque está esperando un recurso o que ocurra algún evento. Ejemplo: un navegador espera que cargue una página desde Internet; mientras tanto, queda en espera.'
            ],
            [
              '5 · Terminado',
              'el proceso ha terminado su ejecución y el sistema operativo libera los recursos que estaba utilizando. Ejemplo: cierras un programa o termina su tarea; el sistema operativo finaliza el proceso y libera la memoria.'
            ]
          ] },
          { h: 'Estados de los procesos (diagrama)' },
          { pasos: [
            'Nuevo → Listo: proceso creado.',
            'Listo → Ejecutando: asignando procesador.',
            'Ejecutando → Listo: interrumpido.',
            'Ejecutando → Bloqueado: pedidos a componentes de E/S.',
            'Bloqueado → Listo: pedidos completados.',
            'Ejecutando → Finalizado: salida.'
          ] }
        ],
        ubuntu: [
          'Linux usa los mismos estados, pero con otros nombres y algunas diferencias. El manual de `ps` los define así:',
          { tabla: [
            ['Código', 'Significado oficial', 'Estado de la AF'],
            ['R', 'en ejecución o ejecutable (en la cola)', 'Ejecución y Listo juntos'],
            ['S', 'espera interrumpible (esperando un evento)', 'Bloqueado'],
            ['D', 'espera no interrumpible (normalmente E/S)', 'Bloqueado por E/S'],
            ['T', 'detenido por una señal de control de trabajos', 'no aparece en la AF'],
            ['Z', 'difunto ("zombi"): terminó pero su padre no lo ha recogido', 'Terminado']
          ] },
          { lista: [
            'No hay estado "Nuevo": un proceso nace con `fork()`, que crea un proceso hijo duplicando al proceso que lo llama, y entra directo a la cola como R.',
            'Listo y Ejecución comparten la letra **R**.',
            'Al terminar, el proceso queda como **zombi** hasta que su padre recoge su estado; entonces se liberan sus últimos recursos.'
          ] }
        ],
        fuentes: ['ps', 'fork']
      },
      {
        titulo: 'Tipos de concurrencia: procesos e hilos',
        veredicto: 'igual',
        af: [
          { h: 'Concurrencia entre procesos' },
          'Ocurre cuando dos o más procesos se ejecutan durante el mismo periodo de tiempo. Cada proceso tiene su propio espacio de memoria; el sistema operativo debe administrar cuándo y cuánto tiempo utiliza cada uno.',
          { h: 'Concurrencia entre hilos' },
          'Se presenta cuando varios hilos pertenecientes a un mismo proceso se ejecutan de forma concurrente. Los hilos comparten una misma memoria, lo que permite que la comunicación entre ellos sea más rápida. Sin embargo, existe el riesgo de errores si no se coordinan correctamente.'
        ],
        ubuntu: [
          'Los manuales de Ubuntu describen exactamente esta diferencia:',
          { def: [
            [
              'Procesos',
              '`fork()` crea un proceso nuevo duplicando al que lo llama. Padre e hijo corren en espacios de memoria separados.'
            ],
            [
              'Hilos',
              'según `pthreads(7)`, los hilos de un proceso comparten la misma memoria global (datos y *heap*), pero cada hilo tiene su propia pila.'
            ]
          ] },
          'El riesgo que menciona la AF es real: como los hilos comparten memoria, hay que protegerla con mutex o semáforos. Con `ps -L` se ven los hilos de cada proceso.'
        ],
        fuentes: ['fork', 'pthreads', 'ps']
      },
      {
        titulo: 'Concurrencia en uno o varios procesadores',
        veredicto: 'igual',
        af: [
          { h: 'Concurrencia en un solo procesador' },
          'La CPU cambia muy rápidamente de un proceso o hilo a otro. Realmente solo se ejecuta uno a la vez; la velocidad con la que ocurre este cambio da la impresión de que varios procesos se están ejecutando al mismo tiempo.',
          { h: 'Concurrencia en varios procesadores' },
          'Con varios procesadores o núcleos, cada uno puede ejecutar un proceso o hilo distinto al mismo tiempo.'
        ],
        ubuntu: [
          'El planificador de Ubuntu trabaja igual en los dos casos: en un núcleo reparte el tiempo y en varios núcleos reparte además los procesos entre las CPU.',
          'Las aplicaciones pueden pedir políticas especiales: `sched(7)` describe las de tiempo real (SCHED_FIFO y SCHED_RR, con prioridades del 1 al 99) y el valor *nice* (de −20 a +19) para las normales.'
        ],
        fuentes: ['sched', 'nproc', 'kEevdf']
      },
      {
        titulo: 'Semáforos y sección crítica',
        veredicto: 'igual',
        af: [
          'Los semáforos son mecanismos de sincronización que controlan el acceso a recursos compartidos mediante las operaciones **wait** y **signal**. Permiten coordinar la ejecución de procesos, evitar conflictos en la sección crítica y pueden ser binarios o contadores.',
          { h: 'Sección crítica' },
          { lista: [
            'Controlan el acceso a recursos compartidos.',
            'Evitan que varios procesos entren simultáneamente.',
            'wait(): solicita acceso.',
            'signal(): libera el recurso.',
            'Semáforo inicializado en 1 → acceso exclusivo.'
          ] },
          { h: 'Problema lectores-escritores' },
          { lista: [
            'Existe un recurso compartido.',
            'Varios lectores pueden acceder simultáneamente.',
            'Un escritor necesita acceso exclusivo.',
            'Se utilizan dos semáforos: sem_recurso y sem_lectores.'
          ] }
        ],
        ubuntu: [
          { h: 'Semáforos POSIX' },
          'El manual `sem_overview(7)` define un semáforo como "un entero cuyo valor nunca puede bajar de cero" con dos operaciones: `sem_post` (sube uno, el *signal* de la AF) y `sem_wait` (baja uno, el *wait*). Si el valor es cero, `sem_wait` se bloquea hasta que sea mayor que cero. Hay semáforos **con nombre** (`/nombre`, para procesos distintos) y **sin nombre** (en memoria compartida).',
          { h: 'Lectores-escritores' },
          'Ubuntu ya trae este caso resuelto: el **bloqueo de lectura-escritura** (`pthread_rwlock`). Un hilo obtiene el bloqueo de lectura si ningún escritor lo tiene ni está esperando; el de escritura es exclusivo.',
          { h: 'Debajo de todo' },
          'Estas herramientas se construyen sobre los **futex** ("mutex rápidos en espacio de usuario") del núcleo Linux.'
        ],
        fuentes: ['semOverview', 'rwlock', 'futex']
      },
      {
        titulo: 'Monitores',
        veredicto: 'distinto',
        af: [
          'Los monitores son una herramienta para controlar el acceso de varios procesos a recursos compartidos.',
          { lista: [
            'Agrupan los datos y procedimientos relacionados con un recurso.',
            'Los datos del monitor no pueden ser modificados directamente desde fuera.',
            'Solo un proceso puede estar dentro del monitor a la vez, mientras los demás esperan.',
            'Ayudan a mantener la exclusión mutua y a coordinar la ejecución de los procesos.',
            'Utilizan variables de condición para que un proceso pueda esperar hasta que se cumpla determinada situación.',
            'Sus operaciones principales son **cwait**, que pone a esperar un proceso, y **csignal**, que permite continuar a uno que estaba esperando.'
          ] },
          { h: 'Estructura de un monitor' },
          'Una cola de entrada de procesos lleva al monitor, que contiene datos locales, variables de condición, los procedimientos 1 a k y el código de inicialización. En el área de espera hay una cola por cada condición (c1 … cn), donde esperan los procesos que hicieron cwait, y una cola urgente para los que hicieron csignal. Los procesos salen del monitor por la salida.'
        ],
        ubuntu: [
          'El lenguaje C, en el que está escrito casi todo Ubuntu, **no tiene monitores** como tal. Ubuntu arma el mismo comportamiento con dos piezas:',
          { def: [
            [
              'Mutex',
              'hace que solo un hilo esté "dentro" a la vez: si el mutex ya está bloqueado por otro hilo, el que llama se bloquea hasta que se libere.'
            ],
            [
              'Variables de condición',
              'son el cwait y csignal de la AF. `pthread_cond_timedwait` bloquea al hilo en una condición y debe llamarse con el mutex tomado; `pthread_cond_signal` despierta a un hilo que esperaba.'
            ]
          ] },
          'Mutex + variables de condición = un monitor hecho a mano.'
        ],
        fuentes: ['mutexPosix', 'condWait', 'condSignal']
      },
      {
        titulo: 'Paso de mensajes',
        veredicto: 'igual',
        af: [
          'El paso de mensajes permite que diferentes procesos se comuniquen e intercambien información, además de ayudar a coordinar su ejecución.',
          { lista: [
            '**Send:** permite enviar un mensaje a otro proceso.',
            '**Receive:** permite recibir un mensaje de otro proceso.',
            'Puede utilizarse para comunicación y sincronización.',
            'Las operaciones pueden ser bloqueantes o no bloqueantes.',
            'Puede utilizar buzones para almacenar y organizar los mensajes.',
            'También puede utilizarse para controlar la exclusión mutua y resolver problemas como productor/consumidor.'
          ] },
          { h: 'Comunicación indirecta de procesos' },
          { def: [
            ['Uno a uno', 'un emisor envía por un puerto a un receptor.'],
            ['Muchos a uno', 'varios emisores envían por un puerto a un receptor.'],
            ['Uno a muchos', 'un emisor deja mensajes en un buzón para varios receptores.'],
            ['Muchos a muchos', 'varios emisores y varios receptores comparten un buzón.']
          ] }
        ],
        ubuntu: [
          'Ubuntu tiene varias formas oficiales de pasar mensajes:',
          { def: [
            [
              'Colas de mensajes POSIX',
              'según `mq_overview(7)`, "permiten a los procesos intercambiar datos en forma de mensajes", con `mq_send` y `mq_receive`. Cada cola tiene un nombre (`/nombre`): es un **buzón** de comunicación indirecta. Pueden ser bloqueantes o no.'
            ],
            [
              'Tuberías (pipes)',
              'un canal de comunicación **unidireccional**: lo que se escribe en un extremo se lee en el otro.'
            ],
            ['Sockets UNIX', 'comunican procesos de la misma máquina de forma eficiente.'],
            [
              'D-Bus',
              'el bus de mensajes de Ubuntu. Permite comunicación uno a uno y, a través del demonio `dbus-daemon`, que muchas aplicaciones se envíen mensajes entre sí: el caso "muchos a muchos".'
            ]
          ] }
        ],
        fuentes: ['mq', 'pipe', 'unixSock', 'dbus']
      },
      {
        titulo: 'Ventajas de la ejecución concurrente',
        veredicto: 'igual',
        af: [
          { def: [
            [
              '1 · Mayor rendimiento del sistema',
              'permite que varios procesos o hilos avancen al mismo tiempo, logrando que el sistema operativo complete más tareas en menos tiempo. Esto mejora el rendimiento de la computadora, especialmente cuando se ejecutan varias aplicaciones de forma simultánea.'
            ],
            [
              '2 · Mejor capacidad de respuesta',
              'las aplicaciones pueden seguir respondiendo al usuario mientras realizan otras tareas en segundo plano, evitando bloqueos y ofreciendo una experiencia de uso más rápida y fluida.'
            ],
            [
              '3 · Mayor escalabilidad',
              'aprovecha mejor los procesadores con varios núcleos al distribuir las tareas entre ellos. Además, permite que el sistema maneje más procesos o usuarios sin disminuir significativamente su rendimiento.'
            ],
            [
              '4 · Uso eficiente de los recursos',
              'optimiza el uso del procesador, la memoria y los dispositivos de entrada y salida. Mientras un proceso espera una operación, el sistema puede ejecutar otro, evitando que los recursos permanezcan inactivos.'
            ]
          ] }
        ],
        ubuntu: [
          'Un ejemplo oficial de cada ventaja en Ubuntu:',
          { def: [
            [
              'Rendimiento',
              '`make -j` indica cuántos trabajos ejecutar simultáneamente al compilar; sin número, no pone límite.'
            ],
            ['Respuesta', 'los comandos con `&` corren en segundo plano y la terminal sigue disponible.'],
            [
              'Escalabilidad',
              'el planificador reparte los procesos entre todos los núcleos que reporta `nproc`.'
            ],
            [
              'Uso de recursos',
              'un proceso esperando E/S (estado D) no ocupa la CPU; otro proceso la usa mientras tanto.'
            ]
          ] }
        ],
        fuentes: ['make', 'bash', 'nproc', 'ps']
      },
      {
        titulo: 'Tipos de procesos concurrentes',
        veredicto: 'igual',
        af: [
          'En los sistemas operativos, los procesos que se ejecutan de forma concurrente se pueden clasificar principalmente en dos tipos según la naturaleza de su ejecución:',
          { def: [
            [
              'Procesos independientes',
              'se ejecutan sin requerir ayuda o cooperación de otros. Son totalmente autónomos; su avance no depende de las demás tareas. Ejemplo: varios intérpretes de mandatos (consolas) ejecutándose al mismo tiempo sin interactuar.'
            ],
            [
              'Procesos cooperativos',
              'están diseñados para trabajar en conjunto en una misma actividad. Necesitan comunicarse e interactuar entre sí durante su ejecución. Ejemplo: un compilador, donde procesos como el compilador y el ensamblador se sincronizan para crear código máquina.'
            ]
          ] }
        ],
        ubuntu: [
          'Los dos ejemplos de la AF existen tal cual en Ubuntu:',
          { def: [
            [
              'Independientes',
              'varias terminales abiertas, cada una con su propio Bash, sin compartir nada.'
            ],
            [
              'Cooperativos',
              'el compilador **GCC** de Ubuntu. Su opción `-pipe` usa "tuberías en lugar de archivos temporales para comunicar las distintas etapas de la compilación": el compilador le pasa el código al ensamblador mientras lo va generando.'
            ]
          ] },
          'En la terminal, una **tubería** (`comando1 | comando2`) une procesos cooperativos: la salida del primero es la entrada del segundo.'
        ],
        fuentes: ['gcc', 'bash']
      },
      {
        titulo: 'Interacciones entre procesos',
        veredicto: 'igual',
        af: [
          'En un sistema operativo se pueden ejecutar distintos procesos, a la misma vez o alternados. Durante su ejecución puede haber diferentes maneras de interacción; esto depende de si comparten información o recursos.',
          { def: [
            [
              'Por independencia',
              'sucede cuando dos o más procesos se pueden ejecutar de manera autónoma, ya que no necesitan información u otros tipos de datos para realizar sus tareas. Esto ocurre porque cada proceso mantiene su propio espacio de trabajo y no tiene necesidad de comunicarse con otros procesos.'
            ],
            [
              'Para la transmisión',
              'ocurre cuando dos o más procesos requieren pasarse información o datos entre sí para llegar a una meta en común. Los procesos interactúan enviando y recibiendo información, además de tener un espacio de memoria común al que todos los procesos involucrados tienen acceso directo.'
            ],
            [
              'Por competencia',
              'está presente cuando dos o más procesos compiten de manera simultánea por el mismo recurso finito del sistema. Es una situación problemática en la que los procesos involucrados leen o escriben los mismos datos compartidos. Existe el mecanismo de "exclusión mutua", que evita que otros procesos usen un recurso compartido si un proceso ya lo está utilizando.'
            ],
            [
              'Para la sincronización y coordinación',
              'ocurre cuando las acciones o el avance de un proceso dependen del progreso de otro proceso. Algunas maneras de evitar que un proceso esté estancado mucho rato son: dormir y despertar; semáforos y mutexes; barreras.'
            ],
            [
              'Que generan conflicto',
              'existen situaciones donde la interacción entre procesos ya no se puede llevar a cabo, porque dos o más procesos quedan bloqueados de manera permanente: cada uno sostiene un recurso que el otro necesita para seguir su ejecución. A esto se le conoce como **interbloqueo**.'
            ],
            [
              'Por comunicación',
              'ocurre cuando dos o más procesos que cooperan necesitan intercambiar información para poder trabajar de manera conjunta. Al ser procesos cooperativos, su ejecución depende de los datos proporcionados por los demás procesos, y tienen un mecanismo de comunicación que les permite enviar y recibir datos durante la ejecución.'
            ]
          ] }
        ],
        ubuntu: [
          'Cada tipo de interacción tiene su herramienta en Ubuntu:',
          { tabla: [
            ['Interacción', 'En Ubuntu'],
            ['Independencia', 'procesos separados creados con fork(), cada uno con su memoria'],
            ['Transmisión', 'memoria compartida, tuberías y colas de mensajes'],
            ['Competencia', 'bloqueos de archivos; `flock` los maneja incluso desde scripts'],
            [
              'Sincronización',
              'futex (dormir y despertar), semáforos, mutex y barreras (`pthread_barrier_wait` bloquea hasta que llegan todos los hilos)'
            ],
            [
              'Conflicto',
              'el núcleo detecta interbloqueos en los bloqueos de archivos: fcntl devuelve el error EDEADLK'
            ],
            ['Comunicación', 'sockets UNIX y D-Bus']
          ] },
          'Dentro del propio núcleo, el validador **lockdep** analiza el orden en que se toman los bloqueos y puede demostrar que no hay combinación que cause un interbloqueo.'
        ],
        fuentes: ['fork', 'flock', 'futex', 'barrier', 'fcntl', 'kLockdep']
      },
      {
        titulo: 'Paralelismo',
        veredicto: 'igual',
        af: [
          'El paralelismo consiste en la ejecución simultánea de dos o más hilos/procesos utilizando múltiples núcleos de CPU. Se busca reducir el tiempo de ejecución de varios hilos/procesos utilizando núcleos de CPU, dependiendo de la cantidad de hilos/procesos que se encuentren.',
          { h: 'Concurrencia vs. paralelismo' },
          { tabla: [
            ['Paralelismo', 'Concurrencia'],
            ['Es un modelo de ejecución.', 'Es un modelo de organización.'],
            [
              'Se enfoca en realizar múltiples tareas simultáneamente.',
              'Se enfoca en organizar diferentes tareas para poder lidiar con todas ellas a la vez.'
            ]
          ] }
        ],
        ubuntu: [
          'En Ubuntu el paralelismo depende de cuántos núcleos haya (`nproc`). La documentación muestra las dos caras de la tabla de la AF:',
          { lista: [
            '**Concurrencia:** el planificador organiza todos los procesos, aunque haya un solo núcleo.',
            '**Paralelismo:** `make -j` lanza varios trabajos de compilación al mismo tiempo para aprovechar todos los núcleos, y `taskset` fija en qué núcleos corre cada proceso.'
          ] },
          { cmd: [['make -j$(nproc)', 'un trabajo de compilación por núcleo disponible']] }
        ],
        fuentes: ['nproc', 'make', 'taskset']
      },
      {
        titulo: 'Exclusión mutua y ejemplos',
        veredicto: 'igual',
        af: [
          'Es un mecanismo que se usa principalmente en los sistemas operativos y en la programación concurrente para controlar el acceso de varios procesos a un recurso compartido. Tiene como objetivo garantizar que solo un proceso pueda utilizar el recurso, mientras que los demás procesos deben esperar para poder usar ese mismo recurso.',
          { h: 'Ejemplos en la vida diaria' },
          { def: [
            [
              'Una impresora',
              'cuando hay varias impresiones por delante, los documentos deben ser procesados de manera que uno termine de imprimirse para que siga el siguiente.'
            ],
            [
              'Cajero automático',
              'cuando una persona está realizando una operación en el cajero, la siguiente persona debe esperar su turno para usar ese mismo cajero.'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu tiene ejemplos reales de exclusión mutua:',
          { def: [
            [
              'La impresora',
              'Ubuntu usa **CUPS**, que según su documentación administra los trabajos de impresión y sus **colas**. Su planificador, `cupsd`, manda los documentos a la impresora uno tras otro.'
            ],
            [
              'Instalar programas',
              'APT y dpkg usan **archivos de bloqueo** para que solo un gestor de paquetes modifique el sistema a la vez. Por eso, si hay una actualización en curso, otra instalación tiene que esperar.'
            ],
            [
              'El núcleo',
              'Linux tiene su propio **mutex**, una primitiva que obliga a acceder en orden (serializar) a la memoria compartida.'
            ]
          ] }
        ],
        fuentes: ['cupsServer', 'cupsd', 'aptGet', 'dpkg', 'kMutex']
      },
      {
        titulo: 'Conclusión',
        veredicto: 'igual',
        af: [
          'La concurrencia es una parte muy importante de los sistemas operativos, ya que permite realizar varias tareas y aprovechar mejor los recursos de la computadora. Se revisaron los diferentes tipos de concurrencia, los modelos de programación y la forma en que los procesos pueden comunicarse y trabajar juntos.',
          'Aunque la concurrencia mejora el rendimiento y la respuesta del sistema, es necesario coordinar correctamente los procesos para evitar problemas como errores, condiciones de carrera o interbloqueos. Este tema ayuda a entender mejor cómo los sistemas operativos organizan las tareas que realizamos diariamente en nuestros dispositivos.'
        ],
        ubuntu: [
          'Todo lo que plantea la AF2 está presente en Ubuntu: procesos e hilos, planificación en uno o varios núcleos, semáforos, mutex, variables de condición, paso de mensajes y detección de interbloqueos.',
          'La diferencia principal está en los detalles: Linux junta "listo" y "ejecución" en un solo estado (R), agrega el estado zombi, y arma los monitores con mutex y variables de condición en lugar de tenerlos como herramienta propia.'
        ],
        fuentes: ['ps', 'pthreads', 'semOverview']
      }
    ]
  },
  {
    id: 'AF3',
    title: 'Almacenaje, memoria y archivos',
    temas: [
      {
        titulo: 'Almacenaje, memoria y archivos',
        veredicto: 'igual',
        af: [
          { def: [
            [
              'Almacenamiento',
              'cualquier medio físico capaz de retener datos, ya sea temporal o permanentemente. Se organiza en una jerarquía según velocidad, costo y volatilidad: desde los registros del CPU y la caché, pasando por la memoria principal, hasta el almacenamiento secundario (discos, SSD) y terciario (respaldos).'
            ],
            [
              'Memoria',
              'nos referimos a la memoria principal o RAM: el dispositivo de acceso directo y volátil donde residen las instrucciones y datos que la CPU está ejecutando activamente en un momento dado. Se distingue del almacenamiento secundario porque es mucho más rápida, pero pierde su contenido al apagar el equipo.'
            ],
            [
              'Archivo',
              'la unidad lógica de almacenamiento persistente que define el sistema operativo: una colección de datos con nombre que permanece guardada incluso después de que el proceso que la creó termina. El conjunto de archivos, junto con la estructura (directorios) que los organiza, forma el sistema de archivos.'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu maneja los tres niveles de la AF:',
          { def: [
            [
              'Memoria',
              'la documentación del kernel recuerda que la memoria física es un recurso limitado; Linux la administra con memoria virtual y usa la RAM libre como **caché de páginas** de los archivos.'
            ],
            [
              'Almacenamiento',
              'discos y particiones, que Ubuntu puede organizar con **LVM**, un método más flexible que las particiones tradicionales.'
            ],
            [
              'Archivos',
              'un solo árbol que empieza en `/`, descrito en el manual `hier(7)`, guardado normalmente en ext4.'
            ]
          ] }
        ],
        fuentes: ['kMmConceptos', 'lvm', 'hier']
      },
      {
        titulo: 'Memoria física, memoria virtual y paginación',
        veredicto: 'igual',
        af: [
          { def: [
            [
              'Memoria física',
              'en cualquier sistema informático es fundamental distinguir entre la memoria física y la memoria virtual. La memoria física, o RAM, es el recurso de hardware real y tangible donde se ejecutan los procesos, pero su capacidad es estrictamente limitada.'
            ],
            [
              'Memoria virtual',
              'para romper esta limitación, los sistemas operativos modernos implementan la memoria virtual, una abstracción lógica que le hace creer a cada proceso que tiene a su disposición un espacio de direcciones inmenso e independiente.'
            ],
            [
              'Conexión entre ambos',
              'se logra mediante la paginación bajo demanda: el sistema mantiene en la memoria física solo las páginas exactas que se están utilizando en ese instante, dejando el resto de la información en el almacenamiento y trayéndola a la RAM únicamente cuando es necesaria.'
            ]
          ] }
        ],
        ubuntu: [
          'La documentación del núcleo Linux que usa Ubuntu explica lo mismo: la memoria física es limitada, y la **memoria virtual** traduce las direcciones virtuales de cada proceso a direcciones físicas, página por página.',
          'Cuando falta RAM, las páginas poco usadas se llevan al **archivo de intercambio**. El instalador de Ubuntu lo crea por defecto como `/swap.img`, con un tamaño calculado automáticamente (hasta 8 GB).'
        ],
        fuentes: ['kMmConceptos', 'curtinSwap']
      },
      {
        titulo: 'Memoria en sistemas de escritorio y móviles',
        veredicto: 'distinto',
        af: [
          { h: 'Escritorio' },
          'En los sistemas operativos de escritorio, la necesidad de liberar espacio se resuelve casi siempre utilizando una variante del **algoritmo del reloj**. Esta estrategia es la favorita en estos entornos porque ofrece un excelente equilibrio técnico, logrando aproximarse al alto rendimiento del modelo ideal LRU (*Least Recently Used*) mientras mantiene una sobrecarga de cómputo bastante baja, evitando así saturar los recursos del procesador.',
          { h: 'Móviles' },
          'En los ecosistemas móviles el reto cambia de naturaleza debido a que la memoria flash se desgasta físicamente con cada ciclo de escritura. Para alargar la vida útil del hardware, ninguno de los sistemas móviles principales recurre a una partición de intercambio tradicional en disco. En su lugar, el problema se aborda primero comprimiendo las páginas inactivas dentro de la propia memoria RAM y, si esta medida no basta para liberar espacio, el sistema toma la decisión agresiva de terminar procesos completos.'
        ],
        ubuntu: [
          'Ubuntu es un sistema de escritorio y servidor, pero no usa exactamente el algoritmo del reloj:',
          { lista: [
            'El núcleo Linux mantiene **listas LRU** de páginas y ofrece **Multi-Gen LRU**, una implementación alternativa que mejora el rendimiento cuando hay presión de memoria.',
            'A diferencia de los móviles, Ubuntu sí usa intercambio en disco (`/swap.img`).',
            'La compresión en RAM existe en el núcleo como **zram**: crea discos en memoria donde las páginas se guardan comprimidas. Se puede activar, pero no es lo que trae el instalador por defecto.',
            'Para terminar procesos cuando falta memoria, Ubuntu Desktop usa **systemd-oomd** desde la 22.04.'
          ] }
        ],
        fuentes: ['kMglru', 'curtinSwap', 'kZram', 'oomd', 'notas2204']
      },
      {
        titulo: 'Windows: memoria y NTFS',
        veredicto: 'distinto',
        af: [
          { h: 'Gestión de memoria en Windows' },
          'En los sistemas Windows, la memoria se gestiona mediante paginación bajo demanda con *clustering*: ante un fallo de página, el sistema no carga solo una, sino varias páginas sucesivas anticipando su uso futuro.',
          'Cada proceso recibe un conjunto de trabajo con un límite mínimo y máximo de páginas, el cual se ajusta dinámicamente si la memoria escasea. Para liberar espacio de forma eficiente, el sistema emplea una variante del algoritmo del reloj en monoprocesadores, o el algoritmo FIFO en entornos multiprocesador.',
          { h: 'Sistemas de archivos en Windows' },
          'Para el almacenamiento local, Windows utiliza **NTFS**, un sistema que trata absolutamente todo como un objeto estructurado con atributos. La información de los archivos se organiza en la Tabla Maestra de Archivos (MFT), utilizando números lógicos de clúster (LCN) para ubicar los datos físicos en el disco. Además, los directorios se indexan mediante árboles B+, una estructura que garantiza búsquedas muy rápidas sin requerir reorganizaciones constantes.'
        ],
        ubuntu: [
          { def: [
            [
              'Memoria',
              'Ubuntu también pagina bajo demanda, pero en lugar de conjuntos de trabajo limita la memoria por grupos de procesos con los **cgroups** del núcleo.'
            ],
            [
              'Archivos',
              'Ubuntu no usa NTFS como sistema propio (usa ext4), pero el núcleo Linux trae el controlador **NTFS3**, que lee y escribe NTFS hasta la versión 3.1. Por eso Ubuntu abre sin problema un disco o una USB de Windows.'
            ]
          ] }
        ],
        fuentes: ['kCgroup', 'kNtfs3', 'instaladorGuiado']
      },
      {
        titulo: 'Solaris: memoria y archivos',
        veredicto: 'igual',
        af: [
          { h: 'Gestión de memoria en Solaris' },
          'Solaris gestiona la memoria a través del proceso **pageout**, el cual opera mediante un algoritmo de reloj de dos manecillas: la manecilla frontal desactiva el bit de referencia de las páginas y la posterior evalúa si deben liberarse. Este mecanismo se activa automáticamente cuando la memoria disponible cae por debajo del umbral *lotsfree*, adaptando la velocidad de exploración según la urgencia. Si el nivel crítico de memoria se mantiene durante varios segundos, el sistema adopta una medida más drástica y comienza a descargar procesos completos.',
          { h: 'Sistemas de archivos en Solaris' },
          'Fiel a su herencia de UNIX, Solaris organiza los archivos utilizando **nodos-i (inodes)**, una estructura de control que mantiene los metadatos completamente separados del nombre del archivo, lo que facilita la creación de múltiples enlaces hacia los mismos datos. Para optimizar el rendimiento en discos magnéticos, arquitecturas clásicas como el Fast File System dividen las particiones en **grupos de cilindros**, reduciendo significativamente el desplazamiento físico de los cabezales de lectura.'
        ],
        ubuntu: [
          'Ubuntu comparte la herencia UNIX de Solaris:',
          { lista: [
            'ext4 también usa **inodos**, separados del nombre. Por eso existen los **enlaces duros**: `link()` crea un nombre nuevo para un archivo que ya existe, y ese nombre funciona igual que el original.',
            'En lugar de grupos de cilindros, ext4 divide el disco en **grupos de bloques**, cada uno con sus mapas de bits, su tabla de inodos y sus datos.',
            'El ajuste de cuánto intercambiar se controla con el parámetro `swappiness` del núcleo, que va de 0 a 200.'
          ] }
        ],
        fuentes: ['link', 'kExt4', 'kExt4Grupos', 'kVmSysctl']
      },
      {
        titulo: 'Linux: memoria y archivos',
        veredicto: 'igual',
        af: [
          { h: 'Gestión de memoria en Linux' },
          'En Linux, la memoria física se organiza en **zonas** específicas para adaptarse a las limitaciones de acceso directo a memoria (DMA) del hardware. Para administrar bloques de páginas contiguas, el núcleo utiliza el algoritmo de descomposición binaria denominado **buddy system**. Adicionalmente, para gestionar la memoria dinámica de vida corta, el sistema emplea una **asignación por franjas** (*slab*) que recicla constantemente las estructuras y descriptores previamente liberados, optimizando la reutilización de recursos.',
          { h: 'Sistemas de archivos en Linux' },
          'En cuanto al almacenamiento, Linux destaca por incorporar el **Sistema de Archivos Virtual (VFS)**, una capa de abstracción orientada a objetos. Esta arquitectura le permite interactuar con diversos formatos de disco y red de manera transparente para el usuario. Gracias a esto, el sistema puede almacenar en caché los nodos-i de forma unificada en la memoria, acelerando las lecturas futuras independientemente de si el archivo utiliza el formato nativo EXT2 o un sistema de archivos moderno estructurado en bitácora.'
        ],
        ubuntu: [
          'Esta parte de la AF describe directamente el núcleo de Ubuntu, y todo se puede comprobar:',
          { def: [
            [
              'Zonas',
              'la documentación del kernel explica que la memoria física se divide en zonas, determinadas por las limitaciones de la arquitectura para acceder a ella.'
            ],
            [
              'Buddy system',
              'el archivo `/proc/buddyinfo` muestra, por zona, los bloques libres de cada tamaño, y sirve para diagnosticar la fragmentación.'
            ],
            ['Slab', '`slabtop` muestra en tiempo real las cachés *slab* del núcleo.'],
            ['VFS', 'la abstracción que permite que distintos sistemas de archivos convivan.'],
            [
              'Bitácora',
              'el sistema moderno con bitácora que usa Ubuntu es **ext4**, con su diario (*journal*).'
            ]
          ] }
        ],
        fuentes: ['kZonas', 'buddyinfo', 'slabtop', 'kVfs', 'kExt4']
      },
      {
        titulo: 'Android: memoria y archivos',
        veredicto: 'distinto',
        af: [
          { h: 'Gestión de memoria en Android' },
          'En el ecosistema móvil, Android hereda la paginación de Linux, pero evita la partición de intercambio tradicional para no acortar la vida útil de la memoria flash. En su lugar, utiliza **zRAM** para comprimir las páginas inactivas directamente en la memoria RAM. Además, su entorno de ejecución ART gestiona la memoria activa mediante un recolector de basura, y cuenta con mecanismos escalonados como el **Low Memory Killer (LMK)** para cerrar procesos en segundo plano cuando los recursos realmente escasean.',
          { h: 'Sistemas de archivos en Android' },
          'Para el almacenamiento, Android soporta múltiples formatos, siendo ext4 el estándar tradicional. Sin embargo, destaca la adopción progresiva de **F2FS**, un sistema de archivos diseñado desde cero para convivir con la naturaleza de las memorias flash. Este sistema opera escribiendo los datos de forma secuencial al final de una cola, lo que reduce significativamente la sobrecarga de escritura y mejora el rendimiento general del dispositivo.'
        ],
        ubuntu: [
          'Ubuntu y Android usan el mismo núcleo, así que las piezas existen en ambos, pero Ubuntu las usa distinto:',
          { tabla: [
            ['Android', 'Ubuntu'],
            [
              'zRAM en lugar de swap',
              'archivo de intercambio en disco por defecto; zram disponible en el núcleo'
            ],
            [
              'Low Memory Killer',
              'systemd-oomd, que actúa según la presión de memoria de cada grupo de procesos'
            ],
            ['ext4', 'ext4, también su formato habitual'],
            ['F2FS', 'el núcleo lo soporta; está pensado para SSD, eMMC y tarjetas SD']
          ] }
        ],
        fuentes: ['kZram', 'curtinSwap', 'oomd', 'kF2fs', 'instaladorGuiado']
      },
      {
        titulo: 'iOS: memoria y archivos',
        veredicto: 'distinto',
        af: [
          { h: 'Gestión de memoria en iOS' },
          'A diferencia de otros sistemas móviles, iOS administra la memoria mediante el **recuento automático de referencias (ARC)**, destruyendo y liberando objetos de manera inmediata en cuanto dejan de utilizarse, sin depender de un recolector de basura en segundo plano. Cuando se presenta una escasez crítica de RAM, el sistema recurre a la compresión de páginas y activa el proceso **Jetsam**, un mecanismo del núcleo que cierra aplicaciones completas al instante para liberar espacio, evitando por completo el uso de particiones de intercambio en disco.',
          { h: 'Sistemas de archivos en iOS' },
          'Para el almacenamiento local, el ecosistema de Apple utiliza **APFS**, un sistema de archivos diseñado específicamente para optimizar el rendimiento de las unidades de estado sólido. Entre sus características destacan los **clones**, que permiten duplicar archivos sin ocupar espacio adicional hasta que sufren modificaciones reales, y las **instantáneas**, que toman registros de solo lectura de todo el sistema para garantizar restauraciones seguras y automáticas durante las actualizaciones.'
        ],
        ubuntu: [
          'Ubuntu no tiene ARC ni Jetsam ni APFS, pero tiene equivalentes:',
          { def: [
            [
              'Memoria',
              'los programas en C piden y liberan memoria a mano (`malloc` y `free`); cuando falta RAM actúa systemd-oomd.'
            ],
            [
              'Clones',
              '`cp --reflink` hace copias tipo *copy-on-write* en los sistemas de archivos que lo permiten: la copia no ocupa espacio nuevo hasta que se modifica.'
            ],
            [
              'Instantáneas',
              'LVM permite crear *snapshots*, y el instalador de Ubuntu ofrece instalaciones guiadas con **ZFS**, que también las tiene.'
            ]
          ] }
        ],
        fuentes: ['malloc', 'oomd', 'cp', 'lvm', 'notas2404']
      },
      {
        titulo: 'HarmonyOS: memoria y archivos',
        veredicto: 'distinto',
        af: [
          { h: 'Gestión de memoria en HarmonyOS' },
          'En su versión NEXT, basada en el microkernel HongMeng, HarmonyOS aborda la gestión de memoria aislando los espacios de trabajo de cada servicio dentro del espacio de usuario. Para garantizar máxima fluidez, emplea un motor de latencia determinista que asigna y prioriza la memoria en tiempo real, evitando que los procesos compitan de forma desordenada por los recursos y asegurando que un fallo de memoria en un módulo no colapse al resto del sistema.',
          { h: 'Sistemas de archivos en HarmonyOS' },
          'El sistema de archivos de HarmonyOS incorpora cifrado nativo por hardware mediante la tecnología TrustZone. Al ejecutarse de forma completamente aislada dentro del espacio de usuario, se asegura de que cualquier fallo o corrupción dentro de la capa de archivos quede contenido sin poner en riesgo la estabilidad del sistema operativo.'
        ],
        ubuntu: [
          'Aquí Ubuntu es casi lo contrario:',
          { lista: [
            'Su núcleo **no es un microkernel**: es monolítico con módulos, así que el sistema de archivos corre dentro del núcleo, no aislado en espacio de usuario.',
            'El aislamiento lo da por proceso: cada uno tiene su memoria, y `mprotect` permite cambiar los permisos de acceso de sus páginas.',
            'El cifrado de disco se hace con **LUKS** (`cryptsetup`), y el instalador de Ubuntu Desktop ofrece cifrar el disco con LVM o ZFS.'
          ] }
        ],
        fuentes: ['modprobe', 'mprotect', 'cryptsetup', 'tutorialInstalar']
      },
      {
        titulo: 'Sistemas operativos de red y middleware',
        veredicto: 'igual',
        af: [
          'Los sistemas operativos de red operan bajo un paradigma diferente al no gestionar la memoria o los archivos físicos locales, sino funcionando como una capa de software superpuesta a los sistemas tradicionales para conectar computadoras independientes y compartir recursos.',
          'Su característica fundamental es la **transparencia limitada**: cada nodo conserva su propia identidad y el usuario está consciente de que interactúa con múltiples máquinas. Este modelo contrasta con el de los sistemas operativos distribuidos, cuyo objetivo clásico era ocultar por completo la complejidad de la red para simular un único equipo centralizado.',
          'Con el tiempo, la idea de un sistema distribuido puro perdió protagonismo en la industria frente al uso del **middleware**, una solución mucho más pragmática y flexible. Tecnologías como CORBA o DCOM de Microsoft demostraron que resultaba mucho más eficiente instalar una capa de integración sobre los sistemas operativos ya existentes para conectar los equipos de manera robusta, evitando la necesidad de reescribir desde cero toda la arquitectura del sistema.'
        ],
        ubuntu: [
          'Ubuntu funciona como el modelo de **sistema operativo de red**: cada equipo conserva su propio Ubuntu y comparte recursos con servicios encima.',
          { def: [
            [
              'NFS',
              'permite compartir directorios y archivos por la red, de modo que se usan "casi como si fueran archivos locales".'
            ],
            ['Samba', 'comparte archivos e impresoras con equipos Windows.']
          ] },
          'Es la "transparencia limitada" de la AF: el usuario sabe que el archivo está en otra máquina, aunque lo use casi como propio.'
        ],
        fuentes: ['nfs', 'samba']
      },
      {
        titulo: 'Importancia de la administración de memoria',
        veredicto: 'igual',
        af: [
          'La administración de memoria es fundamental para que el sistema operativo mantenga un control ordenado y eficiente en la asignación de recursos. Su objetivo principal es responder a las exigencias de los entornos informáticos actuales, permitiendo un manejo flexible de los datos y dando soporte a la programación modular. Para lograrlo, el sistema operativo asume cinco responsabilidades fundamentales:',
          { def: [
            [
              'Aislamiento de procesos',
              'el sistema operativo debe garantizar que cada programa se ejecute en su propio espacio sin interferencias externas. Esto evita que un proceso independiente invada o altere la memoria reservada para otro, resguardando tanto las instrucciones del programa como sus datos.'
            ],
            [
              'Asignación y gestión automática',
              'para elevar la eficiencia del equipo, la memoria se asigna a las tareas únicamente en el instante preciso en que la necesitan. Todo ocurre de manera transparente para el programador, liberándolo de gestionar la memoria de forma manual.'
            ],
            [
              'Soporte a la programación modular',
              'el sistema operativo debe ofrecer la flexibilidad necesaria para trabajar con estructuras de código independientes, permitiendo crear, destruir o cambiar el tamaño de módulos de forma dinámica durante la ejecución.'
            ],
            [
              'Protección y control de accesos',
              'regula la forma en que múltiples usuarios o programas interactúan con la memoria, aplicando controles de acceso y protegiendo al equipo contra amenazas que pongan en riesgo la integridad de las aplicaciones o del propio sistema.'
            ],
            [
              'Almacenamiento a largo plazo',
              'a diferencia de la memoria volátil, asegura que la información se conserve de manera persistente, incluso después de apagar el equipo, combinando la memoria virtual con estructuras permanentes como los archivos o ficheros.'
            ]
          ] }
        ],
        ubuntu: [
          'Las cinco responsabilidades, en Ubuntu:',
          { def: [
            [
              'Aislamiento',
              'cada proceso tiene su propio espacio de direcciones; `fork()` crea el hijo en un espacio separado.'
            ],
            [
              'Asignación automática',
              'un programa pide memoria con `malloc`, y el núcleo solo le da páginas físicas cuando de verdad las usa (paginación bajo demanda).'
            ],
            [
              'Programación modular',
              'las **bibliotecas compartidas**: `ld.so` busca y carga las que necesita cada programa al momento de ejecutarlo.'
            ],
            [
              'Protección',
              '`mprotect` cambia los permisos (lectura, escritura, ejecución) de las páginas de un proceso.'
            ],
            ['Largo plazo', 'los archivos en ext4.']
          ] }
        ],
        fuentes: ['fork', 'malloc', 'ldso', 'mprotect', 'kExt4']
      },
      {
        titulo: 'Importancia de la memoria virtual',
        veredicto: 'igual',
        af: [
          'La memoria virtual es crucial porque permite que múltiples trabajos de usuario residan en la memoria principal de forma concurrente, eliminando los tiempos de espera entre la ejecución de procesos sucesivos.',
          'Gracias al sistema de paginación y al hardware de proyección dinámica, el sistema operativo traduce de manera transparente las direcciones virtuales a direcciones físicas reales en la RAM, logrando un mecanismo con muy baja sobrecarga computacional que optimiza al máximo el tráfico de datos en la jerarquía de memoria.'
        ],
        ubuntu: [
          'La documentación del kernel describe el mismo mecanismo: cada acceso a memoria usa una dirección virtual que el procesador traduce a una física con ayuda de las **tablas de páginas** que mantiene el núcleo.',
          'Para que la traducción sea rápida en equipos con mucha memoria, Linux también ofrece **páginas enormes** (*huge pages*).'
        ],
        fuentes: ['kMmConceptos']
      },
      {
        titulo: 'Registro de memoria: mapa de bits y listas ligadas',
        veredicto: 'igual',
        af: [
          'Para llevar un control ordenado de la memoria asignada y disponible, los sistemas operativos recurren principalmente a dos técnicas: el mapa de bits y las listas libres o ligadas. Ambas permiten que el administrador de memoria reconozca en todo momento qué bloques están en uso por algún proceso y cuáles permanecen vacíos.',
          { def: [
            [
              'Mapa de bits',
              'la memoria se divide en unidades de asignación fijas y a cada una se le asigna un bit: un cero indica que el bloque está libre y un uno que está ocupado. Su tamaño depende de la memoria y del tamaño de la unidad elegida; por ello, definir el tamaño de la unidad es vital, ya que unidades más pequeñas generan mapas de bits considerablemente más grandes.'
            ],
            [
              'Listas ligadas',
              'se mantiene una lista ligada de segmentos que registra tanto los procesos activos como los huecos vacíos entre ellos. Se recomienda mantenerla ordenada por dirección de memoria, ya que esto simplifica la actualización al terminar o intercambiar un proceso y permite aplicar diversos algoritmos de asignación.'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu usa las dos técnicas, en lugares distintos:',
          { def: [
            [
              'Mapas de bits en el disco',
              'cada grupo de bloques de ext4 tiene un **mapa de bits de bloques** y un **mapa de bits de inodos** para saber qué está libre y qué está ocupado.'
            ],
            [
              'Listas en la RAM',
              'el *buddy system* del núcleo guarda listas de bloques libres por tamaño; `/proc/buddyinfo` muestra cuántos hay de cada uno.'
            ]
          ] }
        ],
        fuentes: ['kExt4Grupos', 'buddyinfo']
      },
      {
        titulo: 'Algoritmos de asignación',
        veredicto: 'distinto',
        af: [
          { def: [
            [
              'Primer ajuste',
              'recorre la lista y selecciona el primer hueco lo suficientemente grande; es rápido porque busca lo menos posible.'
            ],
            [
              'Siguiente ajuste',
              'funciona con la misma lógica, pero guarda su última ubicación para iniciar las búsquedas posteriores desde ese punto en lugar de empezar siempre desde el principio.'
            ],
            [
              'Mejor ajuste',
              'examina toda la lista para tomar el hueco más pequeño donde quepa el proceso, conservando los espacios grandes para futuras necesidades, a costa de ser más lento.'
            ],
            [
              'Peor ajuste',
              'selecciona siempre el hueco más grande disponible para dejar un residuo que siga siendo útil, aunque en la práctica suele ser la opción menos óptima.'
            ]
          ] },
          { h: 'Optimización de la asignación' },
          'Para acelerar cualquiera de estos cuatro algoritmos, el administrador de memoria puede separar la estructura en dos listas independientes, una para los procesos y otra para los huecos. Al enfocar la búsqueda exclusivamente en la lista de espacios libres, se evita perder tiempo inspeccionando los segmentos que ya están ocupados.'
        ],
        ubuntu: [
          'El núcleo de Ubuntu no usa ninguno de los cuatro tal cual para la RAM física:',
          { lista: [
            'Usa el **buddy system**: los bloques libres se agrupan por tamaños en potencias de dos, y un bloque grande se parte en dos "compañeros" cuando hace falta uno más chico.',
            'Sí aplica la optimización de la AF: solo guarda listas de **bloques libres** (por zona y tamaño), así que nunca recorre la memoria ocupada.',
            'Los objetos pequeños del núcleo se reparten con el asignador *slab*.'
          ] }
        ],
        fuentes: ['buddyinfo', 'kZonas', 'slabtop']
      },
      {
        titulo: 'Fragmentación interna y externa',
        veredicto: 'igual',
        af: [
          'La administración de memoria es esencial para mantener múltiples procesos funcionando simultáneamente. Según Stallings, debe cumplir con necesidades clave como la reubicación, la protección y el uso compartido de la información, llevando un control exacto de los espacios ocupados y disponibles, aunque optimizar estos recursos siempre conlleva desafíos técnicos.',
          { def: [
            [
              'Fragmentación interna',
              'es común en las particiones fijas. Ocurre cuando un proceso requiere menos espacio del que se le asignó, dejando una parte del bloque sin utilizar de forma permanente. Aunque la pérdida parezca mínima individualmente, la suma de estos espacios reduce significativamente la capacidad de la memoria.'
            ],
            [
              'Fragmentación externa',
              'la suele generar el particionamiento dinámico. A medida que los programas entran y salen de la memoria, se crean pequeños huecos libres dispersos. Aunque la suma de estos huecos sea suficiente para una nueva tarea, al no existir un bloque continuo grande, el nuevo proceso no puede ejecutarse.'
            ]
          ] }
        ],
        ubuntu: [
          'Las dos fragmentaciones existen en Ubuntu:',
          { def: [
            [
              'Externa',
              'el manual de `/proc/buddyinfo` dice que ese archivo sirve justamente para **diagnosticar la fragmentación** de la memoria: si quedan muchos bloques chicos y pocos grandes, la memoria está fragmentada.'
            ],
            [
              'Interna',
              'el núcleo entrega memoria en páginas completas (normalmente 4 KiB), así que lo que un proceso no usa de su última página se desperdicia. El asignador *slab* reduce ese desperdicio para los objetos pequeños.'
            ]
          ] }
        ],
        fuentes: ['buddyinfo', 'slabtop', 'kMmConceptos']
      },
      {
        titulo: 'Estrategias de ubicación y compactación',
        veredicto: 'igual',
        af: [
          'Para decidir en qué espacio libre colocar cada tarea, el sistema utiliza algoritmos como *First-fit*, *Next-fit* o *Best-fit*. Cada estrategia tiene sus ventajas y complicaciones; por ejemplo, Best-fit intenta optimizar la memoria ocupando el hueco más pequeño donde quepa el proceso, pero a la larga deja cientos de espacios diminutos que resultan inservibles.',
          { h: 'Compactación como solución' },
          'Una alternativa para resolver la fragmentación externa es la **compactación**: mover físicamente los procesos activos para agrupar todos los huecos dispersos y formar un único bloque de gran tamaño. Sin embargo, esta operación resulta costosa, ya que reorganizar toda la información interrumpe las tareas y consume tiempo de procesamiento.'
        ],
        ubuntu: [
          'Linux sí hace **compactación de memoria**: la documentación del parámetro `compact_memory` explica que, al activarlo, todas las zonas se compactan para que la memoria libre quede en bloques contiguos. El núcleo también puede compactar de forma automática y gradual (`compaction_proactiveness`).',
          'En el disco pasa algo parecido: `e4defrag` reduce la fragmentación de los archivos en ext4.'
        ],
        fuentes: ['kVmSysctl', 'e4defrag']
      },
      {
        titulo: 'Fallos de página y thrashing',
        veredicto: 'igual',
        af: [
          { h: 'Problemas en la memoria virtual' },
          'La memoria virtual trae su propio grupo de problemas al permitir que los procesos usen un espacio mayor a la RAM física. El sistema debe alternar páginas entre la memoria principal y el almacenamiento secundario, provocando un **fallo de página** cada vez que un proceso necesita un dato que no está cargado, obligando al sistema a ir a buscarlo.',
          { h: 'Riesgo de thrashing' },
          'Si los fallos de página ocurren con demasiada frecuencia, el equipo sufre un colapso conocido como **thrashing** o trasiego. En este estado, el sistema pasa casi todo su tiempo intercambiando páginas entre el disco y la memoria principal, perdiendo la capacidad de ejecutar los procesos reales y provocando que el rendimiento disminuya drásticamente.'
        ],
        ubuntu: [
          'Ubuntu tiene herramientas contra el thrashing:',
          { def: [
            [
              'swappiness',
              'parámetro del núcleo (0 a 200) que define qué tan costoso se considera intercambiar frente a leer archivos; con él se decide qué tan pronto se usa el swap.'
            ],
            [
              'systemd-oomd',
              'vigila la **presión de memoria** (PSI) de cada grupo de procesos y actúa antes de que el sistema quede atrapado intercambiando páginas.'
            ]
          ] },
          'Los fallos de página de cada proceso se pueden consultar en `/proc`.'
        ],
        fuentes: ['kVmSysctl', 'oomd', 'proc']
      }
    ]
  },
  {
    id: 'AF4',
    title: 'Redes y seguridad en sistemas distribuidos',
    temas: [
      {
        titulo: 'Introducción',
        veredicto: 'igual',
        af: [
          'Este tema va desde cómo se comunican las computadoras en red hasta cómo protegerlas y recuperarlas ante fallos o ataques. Comienza con los protocolos de red como TCP/IP, el uso de sockets y cómo el sistema operativo maneja la comunicación.',
          'Luego pasa a los sistemas distribuidos, donde varias computadoras trabajan juntas como clientes y servidores o forman clusters, y a los problemas que surgen al coordinar procesos en diferentes máquinas, como la exclusión mutua y el interbloqueo.',
          'Después se enfoca en la seguridad: se clasifican las amenazas y el malware (virus, gusanos, troyanos, ransomware), se estudian los tipos de intrusos y las técnicas de ataque, y se explican los métodos de autenticación y los niveles de protección.'
        ],
        ubuntu: [
          'Ubuntu cubre los tres bloques de la AF con herramientas oficiales: la red se configura con **Netplan**; los servicios distribuidos se apoyan en NFS, Samba y clústeres de alta disponibilidad; y la seguridad combina actualizaciones, firewall (`ufw`), SSH, AppArmor y cifrado.',
          'La guía oficial de seguridad de Ubuntu Server dice que una instalación nueva "es relativamente segura para usarse de inmediato en Internet", y agrega pasos para reforzarla.'
        ],
        fuentes: ['netplan', 'sugerencias', 'firewall']
      },
      {
        titulo: 'Procesamiento distribuido (DDP)',
        veredicto: 'igual',
        af: [
          'Evolución de las tecnologías en red:',
          { pasos: [
            'El **DDP** (*Distributed Data Processing*) divide funciones de cómputo y organiza bases de datos y control de dispositivos en múltiples nodos.',
            '**Sistemas operativos de red (NOS):** cada equipo conserva su SO local y añade soporte para clientes/servidores explícitamente.',
            '**Sistemas operativos distribuidos (DOS):** un único SO lógico compartido que ofrece transparencia total de recursos al usuario.'
          ] }
        ],
        ubuntu: [
          'Ubuntu encaja en el segundo paso, **sistema operativo de red**: cada equipo tiene su propio Ubuntu y agrega servicios de cliente y servidor, como NFS para compartir archivos, Samba para compartir con Windows u OpenSSH para trabajar en otra máquina.',
          'Ubuntu no es un sistema operativo distribuido (un solo sistema repartido en varias máquinas), aunque con Kubernetes (MicroK8s) puede coordinar muchas máquinas como un clúster.'
        ],
        fuentes: ['nfs', 'samba', 'openssh', 'kubernetes']
      },
      {
        titulo: 'Arquitectura y elementos de un protocolo',
        veredicto: 'igual',
        af: [
          { h: 'Arquitectura de protocolos' },
          { def: [
            [
              'Descomposición en subtareas',
              'las tareas complejas de comunicación se dividen en módulos independientes (acceso a red, servicios de comunicación y aplicación).'
            ],
            [
              'Módulo de servicios de comunicación',
              'garantiza que los datos se intercambien de forma fiable entre ambos sistemas sin importar la red física.'
            ],
            [
              'Módulo de acceso a red',
              'aísla la lógica específica del medio de transmisión (Ethernet, Wi-Fi, etc.) respecto a las aplicaciones superiores.'
            ],
            [
              'Independencia operativa',
              'modificar la infraestructura de red subyacente no altera el funcionamiento de las aplicaciones de usuario.'
            ]
          ] },
          { h: 'Elementos de un protocolo' },
          { def: [
            [
              'Sintaxis',
              'estructura y formato de los datos transmitidos, incluyendo los niveles de señal de voltaje y la codificación de los patrones de bits.'
            ],
            [
              'Semántica',
              'información de control para la coordinación entre entidades y las acciones a seguir para la gestión y recuperación de errores.'
            ],
            [
              'Temporización',
              'coordinación de velocidades de transmisión, secuenciamiento de paquetes y regulación del flujo de datos para evitar colapsos.'
            ]
          ] }
        ],
        ubuntu: [
          'En Ubuntu se nota la **independencia operativa**: una aplicación abre un socket TCP igual si el equipo está conectado por cable o por Wi-Fi. El núcleo se encarga del protocolo y los controladores se encargan del medio.',
          'La configuración del medio está separada en **Netplan**, que define la red en un archivo YAML sin tocar las aplicaciones.'
        ],
        fuentes: ['tcp', 'netplan']
      },
      {
        titulo: 'Modelo TCP/IP de 5 capas',
        veredicto: 'igual',
        af: [
          { tabla: [
            ['Capa', 'Función'],
            ['Aplicación', 'soporta aplicaciones distribuidas (FTP, SMTP, HTTP)'],
            ['Transporte (origen a destino)', 'asegura la entrega fiable y en orden de datos (TCP/UDP)'],
            ['Internet', 'enrutamiento de paquetes entre redes distintas mediante IP'],
            ['Acceso a red', 'interfaz e intercambio de datos entre el host y la red local'],
            ['Física', 'especificaciones mecánicas y eléctricas del medio']
          ] }
        ],
        ubuntu: [
          'Las capas en Ubuntu:',
          { tabla: [
            ['Capa', 'En Ubuntu'],
            ['Aplicación', 'servicios como OpenSSH, Postfix (correo) o vsftpd (FTP)'],
            ['Transporte', 'TCP y UDP, implementados en el núcleo'],
            ['Internet', 'IPv4 e IPv6 en el núcleo'],
            ['Acceso a red', 'interfaces configuradas con Netplan'],
            ['Física', 'tarjetas de red manejadas por sus controladores']
          ] }
        ],
        fuentes: ['tcp', 'udp', 'ipv4', 'ipv6', 'netplan']
      },
      {
        titulo: 'TCP vs. UDP',
        veredicto: 'igual',
        af: [
          { tabla: [
            ['Característica', 'TCP', 'UDP'],
            ['Orientado a conexión', 'Sí (establece sesión previa)', 'No (envío directo de datagramas)'],
            ['Fiabilidad', 'Garantizada (revisión de errores y reenvío)', 'No garantizada (*best effort*)'],
            ['Control de flujo', 'Sí (mediante campo de ventana)', 'No posee control de flujo'],
            ['Sobrecarga de cabecera', 'Mínimo 20 octetos (160 bits)', '8 octetos (64 bits)'],
            [
              'Uso típico',
              'Navegación web, email, transferencia de ficheros',
              'Streaming en vivo, DNS, SNMP, juegos'
            ]
          ] }
        ],
        ubuntu: [
          'Los manuales de Ubuntu describen los dos protocolos igual que la tabla:',
          { def: [
            [
              'TCP',
              'proporciona una conexión "fiable, orientada a flujo y bidireccional entre dos sockets", para IPv4 e IPv6.'
            ],
            [
              'UDP',
              'implementa un servicio de datagramas "sin conexión y no fiable": los paquetes pueden llegar desordenados o duplicados.'
            ]
          ] },
          'Ubuntu además protege TCP contra inundaciones de SYN (un ataque de denegación de servicio) con **SYN cookies**.'
        ],
        fuentes: ['tcp', 'udp', 'synCookies']
      },
      {
        titulo: 'IPv4 vs. IPv6',
        veredicto: 'igual',
        af: [
          { tabla: [
            ['IPv4 (protocolo actual)', 'IPv6 (siguiente generación)'],
            [
              'Direcciones de 32 bits (aprox. 4.3 mil millones)',
              'Direcciones de 128 bits (espacio prácticamente inagotable)'
            ],
            [
              'Cabecera de tamaño variable (mínimo 20 octetos)',
              'Cabecera fija de 40 octetos optimizada para routers de alta velocidad'
            ],
            [
              'Agotamiento de direcciones por la expansión masiva de dispositivos conectados',
              'Soporte nativo para tráfico de tiempo real (etiqueta de flujo) y mayor seguridad'
            ]
          ] }
        ],
        ubuntu: [
          'El núcleo de Ubuntu implementa los dos protocolos (`ip(7)` para IPv4 e `ipv6(7)` para IPv6). Según el manual, una dirección IPv6 son 8 grupos de 4 dígitos hexadecimales separados por `:`, y `::1` es la dirección de *loopback*.',
          'Netplan configura ambas versiones en el mismo archivo, y el firewall `ufw` crea reglas para IPv4 e IPv6.'
        ],
        fuentes: ['ipv4', 'ipv6', 'netplan', 'firewall']
      },
      {
        titulo: 'Encapsulación y direccionamiento',
        veredicto: 'igual',
        af: [
          { h: 'Proceso de encapsulación (PDU)' },
          { pasos: [
            '**Datos de usuario:** la aplicación genera la carga útil original.',
            '**Segmento TCP:** TCP añade una cabecera con puertos de origen/destino y secuencia.',
            '**Datagrama IP:** IP agrega las direcciones IP globales de origen y destino.',
            '**Trama de red:** la capa física/enlace añade control de red y suma de comprobación.'
          ] },
          { h: 'Direccionamiento en TCP/IP' },
          { def: [
            [
              'Dirección IP global',
              'identifica de manera única a la máquina en Internet. La usa el protocolo IP para encaminar el datagrama.'
            ],
            [
              'Número de puerto',
              'identifica a la aplicación o proceso específico dentro de la máquina. Lo usan TCP/UDP para entregar los datos al proceso correcto.'
            ]
          ] }
        ],
        ubuntu: [
          'En Ubuntu cada servicio escucha en un **puerto**. El archivo `/etc/services` relaciona los nombres de los servicios con sus números de puerto y protocolo, y `ss` muestra qué sockets están abiertos.',
          'Ubuntu sigue una política de **"ningún puerto abierto"** desde la versión 6.06: una instalación nueva no debe tener servicios de red escuchando, salvo raras excepciones.'
        ],
        fuentes: ['services', 'ss', 'puertos']
      },
      {
        titulo: 'Aplicaciones TCP/IP clave',
        veredicto: 'distinto',
        af: [
          { def: [
            [
              'SMTP (correo electrónico)',
              'transmite mensajes entre sistemas de forma fiable utilizando conexiones TCP directas.'
            ],
            [
              'FTP (transferencia de ficheros)',
              'usa dos conexiones TCP paralelas: una para control y otra para envío de datos.'
            ],
            [
              'TELNET (terminal remoto)',
              'permite iniciar sesión interactiva en un computador remoto como si fuese un terminal local.'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu documenta las tres, pero con advertencias:',
          { def: [
            ['SMTP', 'el servidor de correo documentado es **Postfix**.'],
            [
              'FTP',
              'se ofrece con **vsftpd**, pero la documentación aclara que FTP no cifra: las credenciales y los datos viajan en claro y se interceptan con facilidad.'
            ],
            [
              'Telnet',
              'Ubuntu lo reemplaza por **OpenSSH**. Su documentación explica que herramientas como telnet "transmiten la contraseña del usuario en texto claro", y SSH cifra toda la sesión.'
            ]
          ] }
        ],
        fuentes: ['postfix', 'ftp', 'openssh']
      },
      {
        titulo: 'Sockets',
        veredicto: 'igual',
        af: [
          { h: '¿Qué es un socket?' },
          'Un socket es un punto final de comunicación entre dos procesos a través de la red. Creado en la *Berkeley Sockets Interface* (UNIX), se convirtió en la API estándar para programación de red.',
          { h: 'Estructura del socket' },
          'Se define mediante la concatenación de una dirección IP y un número de puerto. Fórmula: **Socket = {Dirección IP, Puerto}**. Garantiza la unicidad global de la conexión.',
          { h: 'Tipos de sockets' },
          { tabla: [
            ['Tipo', 'Protocolo', 'Características'],
            [
              'Stream (SOCK_STREAM)',
              'TCP',
              'orientado a conexión, transmisión fiable en flujo continuo de bytes'
            ],
            [
              'Datagram (SOCK_DGRAM)',
              'UDP',
              'sin conexión, paquetes independientes sin garantía de orden o entrega'
            ],
            [
              'Raw (SOCK_RAW)',
              'IP directo / ICMP',
              'acceso directo a protocolos de nivel inferior, usado para inspección y herramientas de red'
            ]
          ] },
          { h: 'API y flujo de sockets' },
          { def: [
            ['socket()', 'crea un nuevo punto final de comunicación.'],
            ['bind()', 'asocia el socket a una IP y puerto local.'],
            ['listen() / accept()', 'el servidor espera y acepta conexiones.'],
            ['connect()', 'el cliente inicia el apretón de manos con el servidor.']
          ] }
        ],
        ubuntu: [
          'Ubuntu usa exactamente esta API. El manual de `socket()` dice que "crea un punto final de comunicación y devuelve un descriptor de archivo" que lo representa, y lista los tipos SOCK_STREAM, SOCK_DGRAM y **SOCK_RAW** ("acceso directo al protocolo de red").',
          'Según `raw(7)`, los sockets *raw* permiten implementar protocolos IPv4 nuevos desde el espacio de usuario, como dice la AF de las herramientas de red.'
        ],
        fuentes: ['socket', 'raw', 'tcp']
      },
      {
        titulo: 'Redes en el kernel de Linux',
        veredicto: 'igual',
        af: [
          { def: [
            ['Interfaz VFS y sockets', 'trata a los sockets como descriptores de archivo genéricos.'],
            ['Estructura sk_buff', 'mantiene los paquetes en memoria sin copiar datos entre capas.'],
            ['Protocol swapping', 'tablas de funciones estandarizadas para TCP, UDP e IP.'],
            ['Controladores de red', 'abstracción de controladores de dispositivo para el hardware físico.']
          ] }
        ],
        ubuntu: [
          'Esta parte describe el núcleo que usa Ubuntu, y se confirma en su documentación:',
          { lista: [
            '`socket()` devuelve un **descriptor de archivo**, así que un socket se lee y escribe como un archivo.',
            'La documentación del kernel describe **sk_buff**: un búfer de datos con las cabeceras y la carga útil, más información compartida, que las capas manipulan sin copiar los datos.',
            'El filtrado de paquetes también vive en el núcleo: el subsistema **netfilter**, en el que se basan todos los firewalls modernos de Linux.'
          ] }
        ],
        fuentes: ['socket', 'kSkbuff', 'firewall']
      },
      {
        titulo: 'Computación cliente/servidor',
        veredicto: 'igual',
        af: [
          '**Concepto:** modelo donde las tareas se dividen entre servidores (proveedores de servicios) y clientes (demandantes).',
          '**Ventajas:** escalabilidad modular, mantenimiento independiente y optimización del tráfico de red.',
          { h: 'Arquitectura de N capas (N-tier)' },
          { def: [
            ['Capa 1 · Presentación', 'interfaz gráfica de usuario (GUI).'],
            ['Capa 2 · Lógica de negocio', 'procesamiento y reglas de negocio (middleware).'],
            ['Capa 3 · Datos', 'base de datos y almacenamiento.']
          ] }
        ],
        ubuntu: [
          'Ubuntu Server está pensado para el lado **servidor** del modelo. Su documentación describe varios servicios con la misma estructura cliente/servidor; por ejemplo, FTP: el servidor (*daemon*) escucha continuamente peticiones de clientes remotos, las autentica y abre la conexión.',
          'Lo mismo pasa con SSH (`sshd` espera conexiones de los clientes), el correo (Postfix) y el intercambio de archivos (NFS y Samba).'
        ],
        fuentes: ['ftp', 'openssh', 'postfix', 'nfs']
      },
      {
        titulo: 'Paso de mensajes distribuido y RPC',
        veredicto: 'igual',
        af: [
          { h: 'Paso de mensajes distribuido' },
          { def: [
            [
              'Sincronización',
              'bloqueante (sincrónico): el emisor/receptor se frena hasta completar la transferencia. No bloqueante (asincrónico): el proceso continúa sin esperar confirmación.'
            ],
            [
              'Direccionamiento',
              'directo: envío explícito al proceso identificador, send(P, mensaje). Indirecto: mensajes dirigidos a buzones o puertos intermedios, send(mailbox, mensaje).'
            ],
            [
              'Gestión de búferes (colas)',
              'capacidad cero (*rendezvous*), capacidad limitada o capacidad ilimitada.'
            ]
          ] },
          { h: 'Llamadas a procedimiento remoto (RPC)' },
          { lista: [
            '**Mecanismo de abstracción:** permite invocar funciones en un equipo remoto con la misma sintaxis de una función local.',
            '**Componentes clave:** *stubs* (talones) en cliente y servidor.',
            '**Marshalling / unmarshalling:** convertir tipos de datos locales a un formato neutro de red (ej. XDR), resolviendo el problema del orden de bytes (*big-endian* vs. *little-endian*).',
            '**Transparencia:** oculta la complejidad física de la red al programador.'
          ] }
        ],
        ubuntu: [
          'Ubuntu usa RPC de verdad, y con el mismo formato que menciona la AF:',
          { def: [
            [
              'rpcbind',
              'servidor que convierte números de programa RPC en direcciones; debe estar corriendo para hacer llamadas RPC a esa máquina.'
            ],
            [
              'XDR',
              'Ubuntu incluye las rutinas de **representación externa de datos** (*external data representation*), el formato neutro de la AF.'
            ],
            ['NFS', 'el sistema de archivos en red de Ubuntu funciona sobre RPC.']
          ] }
        ],
        fuentes: ['rpcbind', 'xdr', 'nfs']
      },
      {
        titulo: 'Arquitecturas de clusters',
        veredicto: 'igual',
        af: [
          '**Concepto:** conjunto de computadoras independientes (nodos) interconectadas que trabajan como un único recurso integrado.',
          { def: [
            [
              'Alto rendimiento (HPC)',
              'cómputo masivo e intensivo en paralelo (ej. uso de la biblioteca MPI).'
            ],
            ['Alta disponibilidad (HA)', 'tolerancia a fallos para mantener servicios continuos (24/7).'],
            [
              'HA asimétrico (activo/pasivo)',
              'un nodo primario trabaja y el secundario está en reserva (*standby*).'
            ],
            ['HA simétrico (activo/activo)', 'todos los nodos procesan y se monitorean mutuamente.'],
            [
              'Interconexión y redes',
              'almacenamiento compartido (SAN/NAS) y señales de control (*heartbeat*).'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu Server documenta los clústeres de **alta disponibilidad** con las herramientas `corosync` (comunicación entre los nodos), `pacemaker` (administra los servicios del clúster) y `fence-agents` (aísla al nodo que falla).',
          'Su documentación explica además el **quórum**: un testigo que evita que las dos mitades de un clúster dividido crean ser el nodo principal al mismo tiempo.'
        ],
        fuentes: ['ha']
      },
      {
        titulo: 'Migración de procesos',
        veredicto: 'na',
        af: [
          { def: [
            [
              'Balanceo de carga',
              'distribución equitativa de procesos entre nodos para mejorar el rendimiento global.'
            ],
            [
              'Rendimiento de comunicación',
              'traslado de procesos cerca de los datos o de otros procesos interdependientes.'
            ],
            [
              'Disponibilidad y tolerancia',
              'salvar la ejecución ante fallos previstos o mantenimientos programados.'
            ],
            ['Estrategias de memoria', 'copia ambiciosa (total o sucia), precopia y copiar-al-referenciar.']
          ] }
        ],
        ubuntu: [
          'La documentación oficial de Ubuntu no describe la migración de procesos individuales entre máquinas.',
          'Lo que sí documenta es la **alta disponibilidad**: si un nodo falla, Pacemaker arranca el **servicio completo** en otro nodo. El objetivo es el mismo (disponibilidad y tolerancia a fallos), pero lo que se mueve es el servicio, no el proceso con su memoria.'
        ],
        fuentes: ['ha']
      },
      {
        titulo: 'Estados globales distribuidos',
        veredicto: 'na',
        af: [
          { def: [
            [
              'Cortes consistentes',
              'un corte en el historial de un sistema distribuido es consistente si no contiene ningún evento de recepción de mensaje sin contener también el evento de envío correspondiente. Garantiza la preservación de la relación de orden causal de Lamport a través de todos los nodos.'
            ],
            [
              'Algoritmo Chandy-Lamport',
              'permite registrar un estado global consistente (instantánea o *snapshot*) sin congelar el funcionamiento del sistema. Utiliza mensajes de control especiales llamados marcadores (*markers*) que circulan a través de canales con ordenamiento FIFO.'
            ]
          ] }
        ],
        ubuntu: [
          'Es un tema de algoritmos distribuidos que no forma parte del sistema operativo Ubuntu: la documentación oficial no lo trata.',
          'Lo más cercano en Ubuntu son las **instantáneas** de almacenamiento (LVM), pero son de una sola máquina, no un estado global de varios nodos.'
        ],
        fuentes: ['lvm']
      },
      {
        titulo: 'Exclusión mutua e interbloqueo distribuidos',
        veredicto: 'na',
        af: [
          { h: 'Exclusión mutua distribuida' },
          { def: [
            [
              'Centralizado',
              'un nodo coordinador gestiona las peticiones. Simple de implementar, pero constituye un punto único de fallo y cuello de botella.'
            ],
            [
              'Basado en token',
              'un token único circula lógicamente por los nodos (*token ring*). Solo el nodo que posee el token tiene autorización para acceder al recurso.'
            ],
            [
              'Ricart-Agrawala',
              'basado en marcas de tiempo distribuidas. Un proceso envía peticiones a todos los nodos y entra a la sección crítica tras recibir confirmación de todos.'
            ]
          ] },
          { h: 'Interbloqueo distribuido' },
          { def: [
            [
              'Grafos de espera',
              'grafo de asignación de recursos distribuido donde los nodos representan procesos y las aristas dirigidas representan solicitudes pendientes de recursos. La presencia de un ciclo dirigido en el grafo global indica la existencia formal de un interbloqueo.'
            ],
            ['Algoritmos de sondas', 'otra técnica de detección de interbloqueos distribuidos.']
          ] }
        ],
        ubuntu: [
          'Estos algoritmos no vienen en Ubuntu como parte del sistema. Dentro de **una sola máquina**, Ubuntu sí resuelve los mismos problemas:',
          { lista: [
            'Exclusión mutua con mutex, semáforos y bloqueos de archivos (ver AF2).',
            'Detección de interbloqueo: `fcntl` devuelve EDEADLK cuando un bloqueo causaría un ciclo, y el validador lockdep revisa el orden de los bloqueos del núcleo.'
          ] },
          'En un clúster de alta disponibilidad, el **quórum** cumple un papel parecido al del coordinador: decide qué parte del clúster puede seguir usando los recursos.'
        ],
        fuentes: ['fcntl', 'kLockdep', 'ha']
      },
      {
        titulo: 'Requisitos de la seguridad informática',
        veredicto: 'igual',
        af: [
          'Los 4 pilares de la seguridad:',
          { def: [
            ['Confidencialidad', 'la información solo es accesible para lectura por partes autorizadas.'],
            ['Integridad', 'la información solo puede ser modificada por partes autorizadas.'],
            [
              'Disponibilidad',
              'los recursos están accesibles para los usuarios autorizados cuando los requieran.'
            ],
            [
              'Autenticación',
              'capacidad del sistema para verificar la identidad real del usuario o proceso.'
            ]
          ] }
        ],
        ubuntu: [
          'Cada pilar tiene su mecanismo en Ubuntu:',
          { tabla: [
            ['Pilar', 'En Ubuntu'],
            ['Confidencialidad', 'permisos de archivos, cifrado de disco LUKS y conexiones cifradas con SSH'],
            [
              'Integridad',
              'APT verifica la firma de los repositorios para que nadie sin la clave de firma altere los paquetes'
            ],
            [
              'Disponibilidad',
              'actualizaciones automáticas de seguridad y Livepatch, que parcha el núcleo sin reiniciar'
            ],
            ['Autenticación', 'contraseñas guardadas como hash (yescrypt), llaves SSH y doble factor']
          ] }
        ],
        fuentes: ['cryptsetup', 'aptSecure', 'actualizaciones', 'livepatch', 'hashing']
      },
      {
        titulo: 'Clasificación de ataques en el flujo de datos',
        veredicto: 'igual',
        af: [
          { def: [
            [
              'Interrupción (disponibilidad)',
              'ocurre cuando se destruye o inhabilita un componente del sistema, impidiendo su uso normal, como al romper un disco duro o deshabilitar un servicio.'
            ],
            [
              'Intercepción (confidencialidad)',
              'sucede cuando un tercero no autorizado accede a la información, por ejemplo al espiar el tráfico de red o copiar archivos o programas.'
            ],
            [
              'Modificación (integridad)',
              'un elemento no autorizado accede a los datos y altera su contenido o comportamiento, como cambiar cifras en una base de datos, alterar un programa o modificar mensajes que viajan por la red.'
            ],
            [
              'Fabricación (autenticación)',
              'consiste en insertar datos o mensajes falsos en el sistema para suplantar una identidad o crear registros ficticios.'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu tiene una defensa oficial para cada tipo:',
          { def: [
            [
              'Interrupción',
              'SYN cookies contra inundaciones de conexiones TCP, y clústeres de alta disponibilidad.'
            ],
            [
              'Intercepción',
              'SSH y TLS cifran el tráfico (Ubuntu trae bibliotecas como OpenSSL, GnuTLS y NSS).'
            ],
            ['Modificación', 'firmas en los repositorios de APT y sumas SHA256 para verificar imágenes.'],
            ['Fabricación', 'autenticación con llaves SSH o Kerberos.']
          ] }
        ],
        fuentes: ['synCookies', 'ha', 'cryptoLibs', 'aptSecure', 'kerberos']
      },
      {
        titulo: 'Amenazas en redes: ataques pasivos y activos',
        veredicto: 'igual',
        af: [
          { def: [
            [
              'Ataques pasivos (confidencialidad)',
              'observan o espían información sin alterar los datos ni la red; al no dejar huella, son difíciles de detectar y se previenen con cifrado. Un ejemplo es el análisis del tráfico.'
            ],
            [
              'Ataques activos (integridad, disponibilidad y autenticación)',
              'alteran los datos o crean flujos falsos afectando el funcionamiento de la red; se busca principalmente detectarlos y recuperarse de ellos. Ejemplos: enmascaramiento, reenvío, modificación y denegación de servicio.'
            ]
          ] }
        ],
        ubuntu: [
          { def: [
            [
              'Contra pasivos',
              'cifrado, como recomienda la AF: la guía de seguridad de Ubuntu pide usar **SSH** para el acceso remoto en lugar de protocolos en texto claro.'
            ],
            [
              'Contra activos',
              'el firewall `ufw` filtra conexiones, las SYN cookies resisten la denegación de servicio y el sistema de auditoría (`auditd`) registra eventos para detectar lo que pasó.'
            ]
          ] }
        ],
        fuentes: ['sugerencias', 'openssh', 'firewall', 'synCookies', 'auditd']
      },
      {
        titulo: 'Clasificación del software malicioso',
        veredicto: 'igual',
        af: [
          { def: [
            [
              'Requieren anfitrión',
              'fragmentos de código que necesitan una aplicación para existir (ej. puerta secreta, bomba lógica, troyanos, virus).'
            ],
            [
              'Independientes',
              'programas autónomos gestionados directamente por el sistema operativo (ej. gusanos, zombies).'
            ],
            [
              'No replicables',
              'solo se ejecutan tras una acción o disparador (ej. troyanos, puertas secretas).'
            ],
            [
              'Replicables',
              'generan copias de sí mismos para infectar el mismo u otros sistemas (ej. virus, gusanos).'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu no está libre de malware, pero reduce los caminos de entrada:',
          { lista: [
            '**Software firmado:** APT revisa la firma de los repositorios oficiales; la guía de seguridad recomienda evitar repositorios de terceros.',
            '**Programas confinados:** AppArmor viene instalado y cargado por defecto, y limita lo que puede hacer cada aplicación aunque esté infectada.',
            '**Menos superficie:** la guía recomienda quitar los paquetes que no se usan.'
          ] }
        ],
        fuentes: ['aptSecure', 'sugerencias', 'apparmor']
      },
      {
        titulo: 'Amenazas de código y tipos de malware',
        veredicto: 'igual',
        af: [
          { def: [
            [
              'Puerta secreta (backdoor)',
              'punto de entrada secreto que omite los controles de autenticación estándar. Origen: usado legítimamente por desarrolladores para depuración o pruebas. Riesgo: usado por programadores maliciosos para accesos no autorizados.'
            ],
            [
              'Bomba lógica',
              'código oculto en un programa legítimo que se "dispara" ante condiciones específicas, como una fecha clave, el borrado de un usuario o un día de la semana. Al explotar puede borrar o alterar datos o ficheros completos, causar que la máquina se detenga o producir algún otro daño.'
            ],
            [
              'Troyano',
              'programa útil, o aparentemente útil, que contiene un código oculto que, al invocarse, realiza una función no deseada o dañina.'
            ],
            [
              'Zombie',
              'programa que toma el control de otro ordenador conectado a Internet y lo utiliza para lanzar ataques difíciles de rastrear hasta el creador del zombie.'
            ],
            [
              'Spyware / adware / ransomware',
              'herramientas orientadas al espionaje de datos, al despliegue publicitario no deseado o al secuestro de información sensible mediante cifrado.'
            ]
          ] }
        ],
        ubuntu: [
          'Defensas oficiales de Ubuntu frente a estos tipos:',
          { def: [
            [
              'Backdoor y troyano',
              'instalar solo desde repositorios firmados y mantener el principio de **mínimo privilegio**: cuentas sin privilegios y sudo solo para administrar.'
            ],
            [
              'Zombie',
              'Ubuntu no deja servicios de red escuchando por defecto ("ningún puerto abierto"), y `ufw` controla qué conexiones se aceptan.'
            ],
            [
              'Ransomware',
              'respaldos; la documentación de Ubuntu Server explica varias formas de hacerlos (rsnapshot, Bacula o scripts de shell).'
            ]
          ] }
        ],
        fuentes: ['aptSecure', 'sugerencias', 'puertos', 'firewall', 'respaldos']
      },
      {
        titulo: 'Virus: naturaleza y ciclo de vida',
        veredicto: 'igual',
        af: [
          '**Naturaleza del virus:** código que infecta otros programas modificándolos para insertar copias de sí mismo. Se ejecuta con los mismos privilegios del usuario infectado.',
          { h: 'Fases del ciclo de vida' },
          { pasos: [
            '**Fase latente:** el virus permanece inactivo en espera de un evento disparador.',
            '**Fase de propagación:** se copia e infecta otros programas o sectores del disco.',
            '**Fase de activación:** se dispara por una condición y se prepara para ejecutar su carga útil.',
            '**Fase de ejecución:** realiza la acción dañina.'
          ] }
        ],
        ubuntu: [
          'La frase clave de la AF, "se ejecuta con los privilegios del usuario infectado", explica el diseño de Ubuntu:',
          { lista: [
            'Como la cuenta root viene desactivada y se trabaja con un usuario normal, un virus no puede modificar los programas del sistema sin la contraseña de `sudo`.',
            'Los archivos del sistema pertenecen a root y un usuario normal no puede escribirlos.',
            'Para frenar la **propagación**, las actualizaciones automáticas corrigen las vulnerabilidades conocidas.'
          ] }
        ],
        fuentes: ['usuarios', 'credentials', 'actualizaciones']
      },
      {
        titulo: 'Clasificación de intrusos',
        veredicto: 'igual',
        af: [
          'Tres perfiles de atacante identificados por Anderson (1980) y retomados por Stallings:',
          { def: [
            [
              'Masquerader (suplantador)',
              'individuo no autorizado que penetra los controles de acceso del sistema aprovechando la cuenta de un usuario legítimo. Suele ser un atacante externo.'
            ],
            [
              'Misfeasor (usuario legítimo abusivo)',
              'usuario autorizado que accede a datos, programas o recursos que no le corresponden, o que utiliza sus propios privilegios de forma indebida. Generalmente es interno.'
            ],
            [
              'Clandestine user (usuario clandestino)',
              'toma el control de supervisión del sistema para evadir la auditoría y el control de acceso, o para suprimir el registro de su propia actividad. Puede ser interno o externo.'
            ]
          ] }
        ],
        ubuntu: [
          { def: [
            [
              'Contra el suplantador',
              '`faillock` lleva el registro de los intentos fallidos de autenticación, y el doble factor impide entrar solo con una contraseña robada.'
            ],
            [
              'Contra el abusivo',
              'como la administración se hace con `sudo` y la contraseña propia, **cada acción queda asociada a quien la hizo**.'
            ],
            [
              'Contra el clandestino',
              '`auditd` escribe en el disco los registros de auditoría, que luego se revisan con `ausearch` o `aureport`.'
            ]
          ] }
        ],
        fuentes: ['faillock', 'totp', 'usuarios', 'auditd']
      },
      {
        titulo: 'Técnicas de intrusión',
        veredicto: 'igual',
        af: [
          'Los métodos más comunes para obtener acceso no autorizado:',
          { def: [
            [
              'Adivinación y captura de contraseñas',
              'prueba de contraseñas por defecto, ataques de diccionario, recolección de datos personales del usuario o captura del fichero de contraseñas del sistema.'
            ],
            [
              'Escaneo de puertos',
              'sondeo sistemático de los puertos de red de un equipo para identificar servicios activos y posibles puntos de entrada.'
            ],
            [
              'Desbordamiento de búfer',
              'envío de datos que exceden el espacio de memoria reservado por un programa, con el fin de forzar la ejecución de código malicioso.'
            ],
            [
              'Explotación de vulnerabilidades',
              'aprovechamiento de fallos de software o configuraciones débiles para obtener acceso no autorizado o elevar privilegios.'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu tiene una defensa documentada para cada técnica:',
          { def: [
            [
              'Contraseñas',
              'se guardan en `/etc/shadow`, que no pueden leer los usuarios normales, y como **hash yescrypt** desde Ubuntu 22.04: aunque se robe el archivo, no se obtienen las contraseñas.'
            ],
            [
              'Escaneo de puertos',
              'política de "ningún puerto abierto": una instalación nueva no tiene servicios escuchando.'
            ],
            [
              'Desbordamiento de búfer',
              'los paquetes se compilan con **stack protector** (un "canario" aleatorio que detecta desbordamientos de pila) y como PIE, y la **ASLR** coloca la memoria en direcciones aleatorias para que el atacante no sepa dónde está su código.'
            ],
            ['Vulnerabilidades', 'actualizaciones automáticas de seguridad y Livepatch para el núcleo.']
          ] }
        ],
        fuentes: ['shadow', 'hashing', 'puertos', 'banderas', 'aslr', 'livepatch']
      },
      {
        titulo: 'Factores de autenticación',
        veredicto: 'igual',
        af: [
          'Cómo verifica el sistema la identidad de quien intenta conectarse:',
          { def: [
            [
              'Algo que se sabe',
              'contraseñas o PIN. Es el esquema clásico de identificador (ID) y contraseña descrito por Stallings.'
            ],
            [
              'Algo que se tiene',
              'tokens físicos, tarjetas inteligentes o dispositivos que el usuario porta consigo.'
            ],
            [
              'Algo que se es',
              'biometría: huella dactilar, rostro o iris, características propias del usuario.'
            ],
            [
              'MFA (autenticación multifactor)',
              'combinación de dos o más factores anteriores para reforzar el control de acceso.'
            ]
          ] }
        ],
        ubuntu: [
          'La autenticación en Ubuntu pasa por **PAM** (módulos de autenticación intercambiables), y la documentación de Ubuntu Server cubre los factores de la AF:',
          { def: [
            ['Algo que se sabe', 'contraseña del usuario.'],
            ['Algo que se tiene', 'llaves SSH, **tarjetas inteligentes** y llaves físicas **U2F/FIDO**.'],
            [
              'MFA',
              'guía oficial de doble factor con códigos TOTP/HOTP: la llave pública es el primer factor y el código temporal el segundo.'
            ]
          ] }
        ],
        fuentes: ['pam', 'openssh', 'smartcard', 'fido', 'totp']
      },
      {
        titulo: 'Controles en tres niveles',
        veredicto: 'igual',
        af: [
          'Defensa en profundidad, del usuario individual a la organización:',
          { def: [
            [
              'Nivel empresa',
              'políticas corporativas de seguridad, gobierno de la información y auditoría que enmarcan las medidas técnicas.'
            ],
            [
              'Nivel red',
              'control de acceso centralizado o descentralizado y segmentación para limitar el alcance de un atacante.'
            ],
            [
              'Nivel usuario',
              'políticas de contraseñas robustas, privilegios mínimos necesarios y verificación proactiva de credenciales.'
            ]
          ] }
        ],
        ubuntu: [
          'La guía de seguridad de Ubuntu Server está organizada de forma parecida:',
          { def: [
            [
              'Empresa',
              'autenticación centralizada con **SSSD** (Active Directory, LDAP, Kerberos), auditoría con `auditd` y Ubuntu Pro para parches de seguridad extendidos.'
            ],
            ['Red', 'firewall `ufw` y acceso remoto solo por SSH.'],
            [
              'Usuario',
              'principio de **mínimo privilegio**: cuentas sin privilegios y `sudo` solo para administrar.'
            ]
          ] }
        ],
        fuentes: ['sssd', 'auditd', 'sugerencias', 'firewall']
      },
      {
        titulo: 'Sistemas confiables',
        veredicto: 'igual',
        af: [
          'Seguridad multinivel y el concepto de monitor de referencia:',
          { def: [
            [
              'Base de computación confiable (TCB)',
              'conjunto de mecanismos de hardware y software —representado en el libro por el "monitor de referencia" y la base de datos del núcleo de seguridad— que aplica la política de seguridad del sistema.'
            ],
            [
              'Control de acceso multinivel',
              'reglas de "no leer hacia arriba" y "no escribir hacia abajo" (propiedad-*), que impiden que la información fluya de niveles de clasificación altos a bajos sin autorización.'
            ],
            [
              'Seguridad en sistemas operativos reales',
              'Windows usa un testigo de acceso (SID) y listas de control de acceso por objeto; UNIX protege las contraseñas mediante cifrado unidireccional (crypt) y control de acceso al fichero de contraseñas.'
            ]
          ] },
          { h: '¿Cuándo podemos confiar en un sistema?' },
          { def: [
            ['Monitor de referencia', 'controla los accesos entre los sujetos y los objetos del sistema.'],
            ['Mediación completa', 'cada acceso debe pasar por el mecanismo de control.'],
            ['Aislamiento', 'el mecanismo debe estar protegido contra modificaciones externas.'],
            ['Verificabilidad', 'su funcionamiento puede ser analizado y demostrado formalmente.']
          ] }
        ],
        ubuntu: [
          { def: [
            [
              'Monitor de referencia',
              'el núcleo Linux tiene los **módulos de seguridad (LSM)**: puntos de control por donde pasan los accesos. Ubuntu usa **AppArmor**, una extensión de control de acceso obligatorio (MAC) basada en perfiles por programa.'
            ],
            [
              'Contraseñas al estilo UNIX',
              'Ubuntu hace lo que la AF dice de UNIX: guarda las contraseñas con un hash de un solo sentido (yescrypt) en `/etc/shadow`, que no pueden leer los usuarios normales.'
            ],
            [
              'Arranque confiable',
              '**UEFI Secure Boot** valida cada programa que se carga al arrancar, y Ubuntu soporta el chip **TPM**.'
            ]
          ] }
        ],
        fuentes: ['kLsm', 'kApparmor', 'shadow', 'hashing', 'secureBoot', 'tpm']
      },
      {
        titulo: 'Access token y descriptores de seguridad',
        veredicto: 'distinto',
        af: [
          { h: '¿Qué contiene un access token?' },
          'El access token responde a una pregunta clave: ¿quién eres y qué puedes hacer?',
          { def: [
            [
              'SID (identidad del usuario)',
              'identificador único que permite reconocer al usuario dentro de la red.'
            ],
            [
              'SIDs de grupos (pertenencia)',
              'indican los grupos a los que pertenece el usuario y permiten asignar permisos de manera colectiva.'
            ],
            [
              'Privilegios (acciones especiales)',
              'determinan operaciones específicas que puede realizar, como crear copias de seguridad o apagar el sistema.'
            ],
            [
              'Atributos por omisión (seguridad inicial)',
              'definen el propietario y los permisos que tendrán los nuevos objetos creados por el usuario.'
            ]
          ] },
          { h: 'Descriptores de seguridad' },
          'Un recurso del sistema necesita saber quién es su propietario, quién puede utilizarlo y qué actividades deben registrarse.',
          { def: [
            ['Propietario', 'tiene el control principal sobre el objeto y sus permisos.'],
            ['DACL', 'define quién puede acceder y qué operaciones puede realizar.'],
            ['SACL', 'determina qué accesos deben quedar registrados para auditoría.']
          ] },
          { h: 'De un usuario a un permiso' },
          { pasos: [
            '**Identificación:** el sistema reconoce al usuario mediante su SID.',
            '**Asignación:** una ACE relaciona ese SID con determinados derechos.',
            '**Interpretación:** la máscara de acceso representa los permisos mediante bits.',
            '**Decisión:** el sistema determina si la operación solicitada está permitida.'
          ] }
        ],
        ubuntu: [
          'Estos conceptos son de **Windows**. Ubuntu tiene un equivalente para cada uno:',
          { tabla: [
            ['Windows', 'Ubuntu'],
            ['SID del usuario', 'UID: el identificador de usuario de cada proceso'],
            ['SIDs de grupos', 'GID y grupos suplementarios'],
            ['Privilegios', 'capabilities: los privilegios de root divididos en unidades'],
            ['Propietario', 'dueño y grupo del archivo'],
            ['DACL', 'permisos rwx y ACL (`getfacl`)'],
            ['SACL', 'reglas de auditoría de `auditd`'],
            ['Máscara de acceso', 'bits de permiso del archivo']
          ] },
          'Los SID solo aparecen en Ubuntu cuando se une a un dominio de **Active Directory**: su documentación explica cómo se mapean a usuarios de Linux.'
        ],
        fuentes: ['credentials', 'capabilities', 'getfacl', 'auditd', 'sids']
      },
      {
        titulo: 'Cuando el sistema es atacado',
        veredicto: 'igual',
        af: [
          '¿Qué ocurre si un programa intenta acceder a información que no le corresponde?',
          { def: [
            [
              'Aislamiento de memoria',
              'el sistema operativo separa la memoria de los procesos para impedir accesos indebidos.'
            ],
            [
              'Malware',
              'programas diseñados para aprovechar vulnerabilidades, provocar daños o interrumpir servicios.'
            ],
            [
              'Virus',
              'pueden infiltrarse en programas legítimos y modificar su comportamiento sin que el usuario lo detecte.'
            ]
          ] },
          '**Cadena de riesgo:** vulnerabilidad → infección → modificación → daño o acceso no autorizado.'
        ],
        ubuntu: [
          'Ubuntu corta la cadena de riesgo en varios puntos:',
          { pasos: [
            '**Vulnerabilidad:** actualizaciones automáticas de seguridad y Livepatch.',
            '**Infección:** ASLR y stack protector dificultan aprovechar errores de memoria.',
            '**Modificación:** cada proceso tiene su memoria aislada, y AppArmor limita qué archivos puede tocar cada programa.',
            '**Daño:** permisos y cuenta root desactivada, para que un programa comprometido no controle todo el sistema.'
          ] }
        ],
        fuentes: ['actualizaciones', 'livepatch', 'aslr', 'banderas', 'apparmor', 'usuarios']
      },
      {
        titulo: 'Cifrado simétrico y asimétrico',
        veredicto: 'igual',
        af: [
          { def: [
            [
              'Cifrado simétrico (clave secreta)',
              'utiliza una clave única compartida tanto para cifrar como para descifrar. Es muy veloz y eficiente para grandes volúmenes de datos. Su desafío principal es la distribución inicial de la clave secreta por un canal seguro.'
            ],
            [
              'Cifrado asimétrico (clave pública)',
              'utiliza un par de claves vinculadas: una clave pública para cifrar y una clave privada para descifrar. Se usa para intercambio de claves, firmas digitales y autenticación. Soluciona la distribución de claves, con un costo computacional mayor.'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu usa los dos tipos:',
          { def: [
            [
              'Simétrico',
              '**LUKS** cifra discos completos (`cryptsetup`), y la llave se puede proteger con el chip TPM.'
            ],
            [
              'Asimétrico',
              'las **llaves SSH** (`ssh-keygen` genera el par de llaves) y **GnuPG** (`gpg`), la herramienta OpenPGP para cifrar y firmar.'
            ],
            ['Bibliotecas', 'OpenSSL, GnuTLS y NSS dan cifrado a las aplicaciones.']
          ] }
        ],
        fuentes: ['cryptsetup', 'clevis', 'sshKeygen', 'gpg', 'cryptoLibs']
      },
      {
        titulo: 'Firmas digitales e integridad',
        veredicto: 'igual',
        af: [
          { def: [
            [
              'Autenticación del emisor',
              'la firma digital se genera cifrando el resumen del mensaje con la clave privada del remitente.'
            ],
            [
              'Funciones hash criptográficas',
              'algoritmos unidireccionales que transforman los datos en una cadena de longitud fija.'
            ],
            [
              'Garantía de integridad',
              'cualquier alteración en el mensaje original invalida el hash verificado por el destinatario.'
            ],
            [
              'No repudio',
              'el emisor no puede negar la autoría de la transacción, ya que solo él posee la clave privada.'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu aplica las firmas digitales en dos lugares muy visibles:',
          { def: [
            [
              'Paquetes',
              'APT revisa la firma del archivo *Release* de cada repositorio, así que nadie sin la clave de firma puede modificar los paquetes.'
            ],
            [
              'Imágenes ISO',
              'el tutorial oficial explica cómo descargar las sumas y la firma, obtener la clave correcta y comprobar la suma **SHA256** de la imagen antes de instalar.'
            ]
          ] },
          { cmd: [['sha256sum -c SHA256SUMS', 'comprueba que la imagen descargada no fue alterada']] }
        ],
        fuentes: ['aptSecure', 'verificarIso', 'sha256sum', 'gpg']
      },
      {
        titulo: 'Firewalls y sus arquitecturas',
        veredicto: 'igual',
        af: [
          '**Cortafuegos (firewalls):** mecanismo de control de acceso, filtrado de tráfico y protección perimetral del sistema.',
          { tabla: [
            ['Tipo', 'Nivel OSI', 'Mecanismo de control', 'Ventajas'],
            [
              'Filtro de paquetes',
              'Red / Transporte (L3/L4)',
              'inspección de direcciones IP, puertos y protocolos',
              'alta velocidad, transparente para el usuario'
            ],
            [
              'Pasarela de nivel circuito',
              'Sesión (L5)',
              'verificación de *handshakes* TCP y conexiones autorizadas',
              'aislamiento eficaz sin procesar capas superiores'
            ],
            [
              'Pasarela de nivel aplicación',
              'Aplicación (L7)',
              'inspección profunda de comandos y contenido (proxy)',
              'máximo nivel de seguridad y registro detallado'
            ],
            [
              'Bastión perimetral',
              'Multicapa',
              'host endurecido expuesto directamente a la red externa',
              'punto focal fortificado para la defensa del sistema'
            ]
          ] }
        ],
        ubuntu: [
          'Ubuntu cubre varias filas de la tabla:',
          { def: [
            [
              'Filtro de paquetes',
              'el núcleo tiene **netfilter**; la herramienta oficial de Ubuntu para configurarlo es **ufw** (*Uncomplicated Firewall*), que crea reglas para IPv4 e IPv6.'
            ],
            [
              'Pasarela de aplicación',
              '**Squid**, un servidor *proxy* para HTTP, FTP y otros protocolos, con controles de acceso detallados.'
            ],
            [
              'Bastión',
              'un Ubuntu Server reforzado con las sugerencias oficiales (solo SSH, firewall, actualizaciones) puede cumplir ese papel.'
            ]
          ] },
          { cmd: [['sudo ufw enable', 'activa el firewall de Ubuntu']] }
        ],
        fuentes: ['firewall', 'ufw', 'squid', 'sugerencias']
      },
      {
        titulo: 'Conclusión',
        veredicto: 'igual',
        af: [
          'La red y la seguridad son partes fundamentales e inseparables de los sistemas distribuidos: la red permite la comunicación entre clientes, servidores y clústeres, mientras que la seguridad protege esa información en todo momento. Se revisaron los aspectos que integran una red estable, los conceptos básicos de su funcionamiento y las estrategias para resguardar los datos ante posibles amenazas.',
          'Aunque un sistema distribuido debe ser rápido, transparente y estar siempre disponible, es necesario implementar medidas de seguridad sólidas para evitar problemas como la pérdida de datos, el mal funcionamiento del sistema o ataques de código malicioso.'
        ],
        ubuntu: [
          'Ubuntu reúne las dos partes de la AF: la pila TCP/IP, los sockets y los servicios de red viven en el núcleo y en Ubuntu Server, y la seguridad está activa desde la instalación (AppArmor, ningún puerto abierto, contraseñas con hash, actualizaciones).',
          'Donde más se separa de la AF es en los algoritmos distribuidos (estados globales, exclusión mutua entre nodos), que no forman parte del sistema operativo, y en los conceptos de Windows (SID, DACL), que Ubuntu resuelve con UID, permisos y ACL.'
        ],
        fuentes: ['apparmor', 'puertos', 'hashing', 'actualizaciones']
      }
    ]
  }
];
