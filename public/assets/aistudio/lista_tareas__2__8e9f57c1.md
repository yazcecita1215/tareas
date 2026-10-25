# **DOCUMENTO DE DEFINICIÓN DEL MVP**

## **LISTO — Aplicación de Lista de Tareas**

**Versión del documento:** 1.2  
**Versión del MVP:** 0.1  
**Fecha:** 24 de octubre de 2026  
**Tipo de aplicación:** Aplicación web progresiva (PWA)  
**Tipo de proyecto:** Práctica académica de desarrollo web  
**Estado:** Propuesta para desarrollo y demostración

---

# **1\. Introducción**

LISTO es una aplicación web de lista de tareas diseñada para ayudar a los usuarios a organizar sus actividades de manera sencilla, práctica y accesible. Su propósito es permitir que las personas registren sus pendientes, establezcan prioridades, asignen fechas límite y consulten el estado de sus actividades desde una interfaz fácil de utilizar.

La aplicación se plantea como una práctica académica en la que se aplicarán conocimientos de HTML, CSS y JavaScript, así como el uso de servicios de Firebase para la autenticación de usuarios y el almacenamiento de información.

El desarrollo se concentrará en las funciones esenciales de una lista de tareas. Las herramientas administrativas avanzadas y otras funciones complementarias quedarán propuestas para futuras versiones, con el objetivo de mantener un alcance realista y facilitar la implementación.

# **2\. Nombre del MVP**

**LISTO — Organiza tus tareas, cumple tus metas.**

El nombre representa una herramienta que permite registrar actividades pendientes, organizar el tiempo y llevar un control de las tareas realizadas.

# **3\. Objetivo general**

Diseñar y desarrollar una aplicación web de lista de tareas que permita a los usuarios administrar sus actividades de manera organizada, utilizando tecnologías web y una base de datos en la nube para conservar su información.

## **3.1. Objetivos específicos**

* Crear una interfaz sencilla, clara y adaptable a diferentes dispositivos.  
* Permitir el registro e inicio de sesión de usuarios.  
* Implementar las operaciones de creación, consulta, edición y eliminación de tareas.  
* Incorporar prioridades, fechas límite y estados de cumplimiento.  
* Almacenar las tareas en una base de datos en la nube.  
* Proteger la información para que cada usuario acceda únicamente a sus propias tareas.  
* Aplicar principios básicos de accesibilidad, seguridad y usabilidad.  
* Verificar el funcionamiento de la aplicación mediante pruebas.

# **4\. Definición del MVP**

Un Producto Mínimo Viable (MVP) es una primera versión de un producto que contiene únicamente las funciones necesarias para resolver una necesidad principal y comprobar que la solución funciona.

En LISTO, el MVP permitirá que un usuario inicie sesión, registre sus tareas, las organice, modifique su información y marque las actividades que haya terminado.

La primera versión no pretende ser una aplicación comercial completa. Se desarrollará con fines académicos, priorizando el funcionamiento de las herramientas esenciales y la correcta organización del código.

# **5\. Problema que busca resolver**

Las personas suelen tener varias actividades escolares, laborales o personales que necesitan realizar durante el día. Cuando no cuentan con una herramienta para organizarlas, pueden olvidar pendientes, confundir fechas de entrega o tener dificultades para identificar cuáles actividades son más importantes.

LISTO busca solucionar este problema mediante una aplicación que permita registrar tareas, asignarles prioridades y fechas límite, y consultar cuáles están pendientes o completadas.

# **6\. Público objetivo**

La aplicación está dirigida a estudiantes, trabajadores y personas que necesitan organizar sus actividades cotidianas.

El diseño deberá ser comprensible para usuarios con diferentes niveles de experiencia tecnológica, evitando procesos innecesarios y utilizando instrucciones claras.

# **7\. Alcance del MVP**

## **7.1. Funciones incluidas**

La primera versión contempla:

* Pantalla de bienvenida.  
* Registro e inicio de sesión.  
* Autenticación mediante una cuenta de Google o el método de acceso que se configure en Firebase.  
* Cierre de sesión.  
* Creación de tareas.  
* Consulta de tareas guardadas.  
* Edición y eliminación de tareas propias.  
* Marcado de tareas como completadas o pendientes.  
* Asignación de prioridad baja, media o alta.  
* Asignación de fecha límite.  
* Filtros por estado y prioridad.  
* Almacenamiento persistente en Firebase Cloud Firestore.  
* Separación de los datos de cada usuario.  
* Interfaz adaptable a computadoras, tabletas y celulares.  
* Validaciones básicas de formularios y mensajes de confirmación.

## **7.2. Funciones fuera del alcance inicial**

Para evitar que la práctica sea demasiado extensa, no se implementarán inicialmente:

* Notificaciones automáticas del teléfono.  
* Estadísticas avanzadas y reportes de productividad.  
* Compartir listas entre usuarios.  
* Calendarios complejos.  
* Integraciones con otras aplicaciones.  
* Registro avanzado de auditoría.  
* Administración completa de cuentas y permisos desde un panel.  
* Gestión de varios administradores.  
* Funciones de inteligencia artificial.  
* Sincronización con calendarios externos.

Estas funciones podrán considerarse en futuras versiones si el proyecto evoluciona.

# **8\. Tipos de usuario y permisos**

Para mantener una estructura clara, se definen los siguientes roles conceptuales.

## **8.1. Visitante**

Es la persona que todavía no ha iniciado sesión.

**Permisos:**

* Acceder a la pantalla de bienvenida.  
* Consultar información general sobre LISTO.  
* Acceder a las opciones de registro e inicio de sesión.

**Restricciones:**

* No puede crear ni consultar tareas.  
* No puede modificar información de otros usuarios.  
* No puede acceder a funciones privadas.

## **8.2. Usuario registrado**

Es el usuario principal de la aplicación y el único rol necesario para utilizar las funciones esenciales del MVP.

**Permisos:**

* Iniciar y cerrar sesión.  
* Crear tareas personales.  
* Consultar sus propias tareas.  
* Editar y eliminar sus tareas.  
* Marcar tareas como completadas o pendientes.  
* Asignar prioridades y fechas límite.  
* Filtrar las tareas por estado o prioridad.

**Restricciones:**

* No puede consultar las tareas privadas de otros usuarios.  
* No puede modificar la información de otras cuentas.  
* No puede cambiar sus propios permisos de seguridad.  
* No puede acceder a funciones administrativas no autorizadas.

## **8.3. Administrador**

Se conserva como un rol previsto para una futura ampliación, pero no será necesario implementarlo en la primera versión funcional.

En una versión posterior podría encargarse de gestionar cuentas ordinarias, consultar información general del sistema y atender problemas de acceso.

No tendrá acceso automático al contenido privado de las tareas de los usuarios. Tampoco podrá asignarse privilegios superiores ni nombrar a otros administradores si esas acciones no están expresamente autorizadas.

## **8.4. Administrador principal**

Se contempla como un rol opcional para una futura versión administrativa.

Podría gestionar los permisos de administración, designar o retirar administradores autorizados y supervisar configuraciones globales del sistema.

Este rol no formará parte de las funciones obligatorias del MVP. Si se implementa posteriormente, sus privilegios deberán protegerse mediante controles de seguridad del lado del servidor y no únicamente mediante elementos ocultos en la interfaz.

## **8.5. Regla de asignación de roles**

Durante la práctica inicial, la aplicación funcionará principalmente con usuarios registrados.

Si se incorporan los roles administrativos, se aplicarán las siguientes reglas:

* Los usuarios ordinarios no podrán modificar sus propios roles.  
* Los administradores solo podrán gestionar las funciones que tengan autorizadas.  
* Únicamente el administrador principal podrá designar o retirar administradores, si se decide implementar esa función.  
* Ningún usuario podrá elevar sus propios privilegios mediante modificaciones en la interfaz.  
* Los permisos deberán validarse mediante mecanismos seguros del backend y de la base de datos.

# **9\. Requerimientos funcionales**

Los requerimientos funcionales describen las acciones que el sistema debe permitir.

| Código | Requerimiento | Prioridad |
| ----- | ----- | ----- |
| RF-01 | Mostrar una pantalla de bienvenida con acceso al sistema. | Alta |
| RF-02 | Permitir el inicio de sesión mediante el proveedor de autenticación configurado. | Alta |
| RF-03 | Permitir cerrar sesión de manera segura. | Alta |
| RF-04 | Permitir crear tareas con título y descripción opcional. | Alta |
| RF-05 | Mostrar las tareas correspondientes al usuario autenticado. | Alta |
| RF-06 | Permitir editar los datos de una tarea propia. | Alta |
| RF-07 | Permitir eliminar una tarea propia. | Alta |
| RF-08 | Permitir marcar una tarea como pendiente o completada. | Alta |
| RF-09 | Permitir asignar prioridad y fecha límite a una tarea. | Alta |
| RF-10 | Permitir filtrar tareas por estado y prioridad. | Media |
| RF-11 | Guardar los cambios en la base de datos. | Alta |
| RF-12 | Impedir el acceso no autorizado a tareas de otros usuarios. | Alta |
| RF-13 | Mostrar mensajes de validación, confirmación y error. | Alta |
| RF-14 | Permitir el uso de la interfaz desde diferentes tamaños de pantalla. | Alta |

# **10\. Requerimientos no funcionales**

## **10.1. Usabilidad**

La aplicación deberá presentar una estructura clara, con botones identificables, formularios sencillos y mensajes comprensibles.

## **10.2. Accesibilidad**

Se utilizarán contrastes adecuados, etiquetas en los campos de formulario, textos legibles, navegación por teclado y descripciones accesibles para los controles importantes.

## **10.3. Rendimiento**

Las pantallas deberán cargar sin demoras innecesarias. Las consultas a la base de datos deberán limitarse a la información necesaria.

## **10.4. Seguridad**

La autenticación se realizará mediante Firebase Authentication. Las tareas se almacenarán en Cloud Firestore con reglas que permitan al usuario consultar y modificar únicamente los registros que le pertenecen.

Las claves privadas, credenciales administrativas y secretos del servidor no deberán incluirse en el código público del navegador.

## **10.5. Compatibilidad**

La aplicación deberá funcionar en navegadores modernos y adaptarse a computadoras, tabletas y celulares.

## **10.6. Mantenibilidad**

El código se organizará por archivos y responsabilidades para facilitar las correcciones y futuras ampliaciones.

# **11\. Diseño de la interfaz**

LISTO tendrá una apariencia sencilla, moderna y enfocada en la organización de tareas.

## **11.1. Paleta de colores**

* Fondo principal: verde oscuro `#101714`.  
* Paneles y tarjetas: verde grisáceo oscuro `#1B2620`.  
* Color de acento: verde `#35C878`.  
* Texto principal: blanco suave `#F5F7F5`.  
* Texto secundario: gris verdoso `#B6C1BA`.  
* Advertencias: amarillo `#F2B84B`.  
* Errores: rojo `#E85D5D`.

Los colores se aplicarán procurando mantener un contraste suficiente para facilitar la lectura.

## **11.2. Componentes principales**

La interfaz contará con:

* Encabezado con el nombre y la identidad visual de LISTO.  
* Formulario de inicio de sesión.  
* Panel principal de tareas.  
* Botón para crear una tarea.  
* Formularios para registrar o editar actividades.  
* Tarjetas o filas para visualizar las tareas.  
* Indicadores de prioridad y estado.  
* Controles de filtrado.  
* Mensajes de confirmación y error.  
* Menú para cerrar sesión.

## **11.3. Diseño adaptable**

En computadoras se podrá aprovechar el espacio disponible para mostrar más información. En celulares, los elementos se organizarán verticalmente y los botones tendrán un tamaño cómodo para tocarse.

# **12\. Arquitectura tecnológica**

La arquitectura propuesta separa la interfaz, la lógica de funcionamiento, la autenticación y el almacenamiento de información.

## **12.1. Tecnologías**

**HTML5:** estructura y contenido de las pantallas.

**CSS3:** diseño visual, distribución, colores y adaptación a diferentes dispositivos.

**JavaScript:** interacción con los formularios, gestión de tareas y comunicación con Firebase.

**Firebase Authentication:** registro e inicio de sesión de usuarios.

**Firebase Cloud Firestore:** almacenamiento de usuarios y tareas en la nube.

**Firebase Hosting:** opción para publicar la aplicación web cuando se necesite demostrarla mediante un enlace.

**PWA:** posibilidad de instalar la aplicación desde un navegador compatible. La instalación se considerará parte de la configuración progresiva y no deberá confundirse con las funciones básicas de gestión de tareas.

## **12.2. Funcionamiento general**

1. El usuario abre la aplicación.  
2. El sistema muestra la pantalla de bienvenida o inicio de sesión.  
3. El usuario se autentica mediante Firebase Authentication.  
4. La aplicación obtiene la identidad del usuario autenticado.  
5. Se consultan las tareas que pertenecen a esa cuenta.  
6. El usuario crea, edita, elimina o completa tareas.  
7. Los cambios se guardan en Cloud Firestore.  
8. Las reglas de seguridad verifican que el usuario tenga permiso para acceder a cada registro.  
9. El usuario puede cerrar sesión cuando termine.

## **12.3. Consideraciones de implementación**

Firebase debe configurarse con un proyecto real y con las reglas de seguridad correspondientes.

La configuración de Firebase utilizada en el navegador no sustituye las reglas de seguridad. La autorización debe verificarse en la base de datos y, cuando corresponda, en servicios de backend.

No se deberán almacenar contraseñas de forma manual en la colección de usuarios ni confiar únicamente en el rol recibido desde la interfaz.

# **13\. Modelo de datos**

Para esta práctica se propone utilizar Cloud Firestore, una base de datos NoSQL organizada mediante colecciones y documentos.

## **13.1. Colección de usuarios**

Nombre sugerido: `users`.

Cada documento corresponderá a un usuario autenticado.

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| uid | String | Identificador único del usuario proporcionado por Firebase Authentication. |
| nombre | String | Nombre que se mostrará en la aplicación. |
| correo | String | Correo electrónico asociado a la cuenta. |
| rol | String | Rol autorizado, inicialmente usuario. |
| estado | String | Estado de la cuenta, si se implementa esta función. |
| fechaCreacion | Timestamp | Fecha de creación del perfil. |

La información de autenticación y las contraseñas serán gestionadas por Firebase Authentication, no por una colección propia.

## **13.2. Colección de tareas**

Nombre sugerido: `tasks`.

Cada documento representará una tarea.

| Campo | Tipo | Descripción |
| ----- | ----- | ----- |
| taskId | String | Identificador único de la tarea. |
| ownerUid | String | Identificador del usuario propietario. |
| titulo | String | Nombre de la tarea. |
| descripcion | String | Detalles opcionales de la actividad. |
| prioridad | String | Baja, media o alta. |
| estado | String | Pendiente o completada. |
| fechaLimite | Timestamp o null | Fecha límite de la tarea. |
| fechaCreacion | Timestamp | Fecha de registro. |
| fechaActualizacion | Timestamp | Fecha de la última modificación. |

La aplicación deberá validar los campos antes de guardar los datos y limitar las operaciones a los registros autorizados.

## **13.3. Relación entre usuarios y tareas**

Un usuario puede tener muchas tareas, pero cada tarea pertenece a un solo usuario.

Esta relación se representa mediante el campo `ownerUid`, que identifica al propietario de cada tarea.

Aunque Firestore no utiliza claves foráneas como una base de datos relacional tradicional, la propiedad de cada registro deberá validarse mediante reglas de seguridad.

# **14\. Estructura de archivos propuesta**

Una estructura inicial para el desarrollo podría ser la siguiente:

LISTO/

│

├── index.html

├── login.html

├── tareas.html

│

├── css/

│   └── estilos.css

│

├── js/

│   ├── firebase-config.js

│   ├── auth.js

│   ├── tareas.js

│   └── app.js

│

├── assets/

│   └── iconos/

│

├── manifest.json

└── README.md

La estructura podrá ajustarse conforme avance la práctica. Los archivos de configuración y scripts deberán mantenerse separados para facilitar su comprensión y mantenimiento.

# **15\. Flujos de funcionamiento**

## **15.1. Flujo del visitante**

1. Abre la aplicación.  
2. Consulta la pantalla de bienvenida.  
3. Selecciona la opción de iniciar sesión.  
4. Se autentica mediante el proveedor configurado.  
5. Si la autenticación es correcta, accede al panel de tareas.

## **15.2. Flujo del usuario registrado**

1. Inicia sesión.  
2. Visualiza sus tareas.  
3. Selecciona la opción para crear una tarea.  
4. Ingresa el título y, si lo desea, una descripción.  
5. Asigna prioridad y fecha límite.  
6. Guarda la tarea.  
7. Puede editarla, eliminarla o marcarla como completada.  
8. Puede filtrar la lista para localizar actividades.  
9. Cierra sesión cuando termina.

## **15.3. Flujo de administración futura**

Si se amplía la aplicación, se podrá añadir un panel administrativo independiente.

Las funciones de administración se implementarán únicamente cuando exista una necesidad definida y se hayan establecido los permisos y mecanismos de seguridad correspondientes.

# **16\. Reglas de negocio**

1. Cada tarea deberá tener un título.  
2. El título no podrá estar vacío ni superar el límite de longitud definido por la aplicación.  
3. La descripción será opcional.  
4. La prioridad solo podrá tomar los valores baja, media o alta.  
5. El estado solo podrá tomar los valores pendiente o completada.  
6. Una tarea tendrá un único propietario.  
7. El usuario solo podrá consultar y modificar sus propias tareas.  
8. La eliminación de una tarea deberá solicitar confirmación cuando sea necesario para evitar acciones accidentales.  
9. Los formularios deberán validar la información antes de guardarla.  
10. Los datos deberán conservarse al cerrar y volver a abrir la aplicación, siempre que exista una conexión y la operación de guardado haya sido confirmada.  
11. Las acciones que requieran autenticación no estarán disponibles para visitantes.  
12. Las reglas de seguridad de Firestore deberán impedir accesos no autorizados, incluso si alguien intenta realizar operaciones fuera de la interfaz.  
13. Los permisos administrativos no podrán asignarse mediante una modificación ordinaria realizada por el usuario desde el navegador.

# **17\. Criterios de aceptación**

El MVP se considerará funcional cuando cumpla los siguientes criterios:

* El usuario puede iniciar y cerrar sesión correctamente.  
* Los formularios detectan campos obligatorios vacíos.  
* El usuario puede crear una tarea y verla en su lista.  
* El usuario puede editar una tarea y consultar los cambios guardados.  
* El usuario puede eliminar una tarea propia.  
* El usuario puede marcar una tarea como completada o pendiente.  
* La prioridad y la fecha límite pueden registrarse y consultarse.  
* Los filtros muestran las tareas que corresponden a los criterios seleccionados.  
* Las tareas continúan disponibles después de cerrar y volver a abrir la aplicación.  
* Dos cuentas diferentes no pueden consultar ni modificar las tareas privadas de la otra.  
* La interfaz puede utilizarse desde una computadora y un celular.  
* Los errores de conexión o guardado se comunican al usuario de manera comprensible.

# **18\. Plan de pruebas**

Las pruebas verificarán que las funciones principales se comporten correctamente.

| Prueba | Acción | Resultado esperado |
| ----- | ----- | ----- |
| PT-01 | Abrir la aplicación sin iniciar sesión. | Se muestra la bienvenida o el acceso. |
| PT-02 | Iniciar sesión con credenciales válidas. | Se accede al panel de tareas. |
| PT-03 | Intentar guardar una tarea sin título. | Se muestra un mensaje de validación. |
| PT-04 | Crear una tarea válida. | La tarea se guarda y aparece en la lista. |
| PT-05 | Editar una tarea propia. | Se muestran los cambios guardados. |
| PT-06 | Eliminar una tarea propia. | La tarea deja de aparecer. |
| PT-07 | Marcar una tarea como completada. | El estado se actualiza correctamente. |
| PT-08 | Filtrar por prioridad o estado. | Se muestran las tareas correspondientes. |
| PT-09 | Cerrar y volver a abrir la aplicación. | Las tareas guardadas continúan disponibles. |
| PT-10 | Intentar consultar tareas desde otra cuenta. | Se deniega el acceso a los datos ajenos. |
| PT-11 | Utilizar la aplicación desde un celular. | La interfaz se adapta al tamaño de pantalla. |
| PT-12 | Intentar una operación sin autorización. | La base de datos rechaza la operación. |

Las pruebas de seguridad deberán realizarse en un entorno de desarrollo, utilizando cuentas y datos de prueba.

# **19\. Seguridad y privacidad**

La aplicación manejará información asociada a cuentas de usuario, por lo que deberá considerar las siguientes medidas:

* Utilizar Firebase Authentication para la autenticación.  
* Aplicar reglas de seguridad restrictivas en Cloud Firestore.  
* Limitar la lectura y escritura de cada tarea a su propietario.  
* Evitar almacenar contraseñas manualmente.  
* No incluir secretos administrativos en los archivos públicos.  
* Validar los datos recibidos antes de procesarlos.  
* Mostrar únicamente la información necesaria para el funcionamiento.  
* Evitar exponer correos electrónicos y otros datos personales en pantallas públicas.  
* Utilizar conexiones HTTPS al publicar la aplicación.  
* Probar los permisos con cuentas diferentes antes de la demostración.

Para el entorno académico se utilizarán datos ficticios o de prueba. Si en el futuro se recopilan datos reales, será necesario revisar las obligaciones de privacidad aplicables.

# **20\. Accesibilidad**

LISTO deberá facilitar el uso a personas con diferentes necesidades y niveles de experiencia.

Se considerarán las siguientes medidas:

* Contraste adecuado entre texto y fondo.  
* Tamaño de letra legible.  
* Etiquetas claras en los campos de formulario.  
* Botones con nombres descriptivos.  
* Navegación mediante teclado.  
* Indicadores de prioridad que no dependan exclusivamente del color.  
* Mensajes de error comprensibles.  
* Diseño adaptable a pantallas pequeñas.  
* Alternativas textuales para iconos funcionales cuando sean necesarias.

# **21\. Instalación y puesta en marcha**

## **21.1. Preparación del entorno**

1. Instalar o utilizar un editor de código, como Visual Studio Code.  
2. Crear la carpeta del proyecto.  
3. Crear los archivos HTML, CSS y JavaScript.  
4. Preparar la estructura inicial de la interfaz.  
5. Probar la aplicación en un navegador moderno.

## **21.2. Configuración de Firebase**

1. Crear un proyecto en Firebase Console.  
2. Registrar una aplicación web dentro del proyecto.  
3. Configurar Firebase Authentication y habilitar el proveedor de inicio de sesión elegido.  
4. Crear una base de datos Cloud Firestore.  
5. Definir la estructura de las colecciones.  
6. Configurar y probar las reglas de seguridad.  
7. Conectar la aplicación con Firebase mediante su SDK.  
8. Verificar que el inicio de sesión y las operaciones sobre tareas funcionen correctamente.

La configuración concreta dependerá del proveedor de autenticación y de las opciones habilitadas en el proyecto.

## **21.3. Publicación opcional**

Si se necesita demostrar la aplicación mediante un enlace, podrá utilizarse Firebase Hosting u otro servicio compatible.

La publicación deberá realizarse después de probar el funcionamiento y verificar que no se expongan datos ni configuraciones sensibles.

# **22\. Riesgos y limitaciones**

| Riesgo o limitación | Medida propuesta |
| ----- | ----- |
| Configuración incorrecta de Firebase. | Seguir la documentación oficial y realizar pruebas. |
| Acceso a tareas de otros usuarios. | Configurar y verificar las reglas de seguridad. |
| Pérdida de información por errores de guardado. | Mostrar el estado de las operaciones y confirmar los cambios. |
| Retrasos en el desarrollo. | Priorizar las funciones indispensables. |
| Problemas de visualización en celulares. | Realizar pruebas en diferentes tamaños de pantalla. |
| Complejidad de los roles administrativos. | Mantenerlos fuera de la primera versión funcional. |
| Dependencia de la conexión a internet. | Informar al usuario cuando no pueda completarse una operación en la nube. |
| Cambios en la configuración de servicios externos. | Consultar la documentación oficial al implementar. |

# **23\. Organización del desarrollo**

Para mantener un alcance realista, el desarrollo se dividirá en etapas.

## **Etapa 1\. Diseño de la interfaz**

* Crear la estructura HTML.  
* Definir los estilos CSS.  
* Diseñar la pantalla de bienvenida y el panel de tareas.  
* Comprobar la adaptación a celulares y computadoras.

## **Etapa 2\. Funciones de las tareas**

* Crear formularios.  
* Programar la creación y visualización de tareas.  
* Incorporar edición, eliminación y marcado de cumplimiento.  
* Añadir prioridades, fechas límite y filtros.

## **Etapa 3\. Integración con Firebase**

* Configurar el inicio de sesión.  
* Conectar Cloud Firestore.  
* Guardar y consultar tareas.  
* Asociar cada tarea con su propietario.  
* Configurar las reglas de seguridad.

## **Etapa 4\. Pruebas y correcciones**

* Ejecutar las pruebas funcionales.  
* Verificar la separación de datos entre usuarios.  
* Corregir errores de interfaz.  
* Comprobar la persistencia de la información.  
* Preparar la demostración académica.

## **Etapa 5\. Documentación y entrega**

* Organizar los archivos.  
* Explicar las tecnologías utilizadas.  
* Documentar las funciones implementadas.  
* Presentar los resultados de las pruebas.  
* Preparar una demostración del MVP.

# **24\. Versiones futuras**

Las siguientes versiones representan posibilidades de crecimiento y no forman parte de las obligaciones de la primera entrega.

**Versión 1.1 — Mejoras de organización**

* Categorías personalizadas.  
* Búsqueda por palabras.  
* Recordatorios sencillos.  
* Mejoras visuales y de accesibilidad.

**Versión 1.2 — Seguimiento de actividades**

* Resumen de tareas completadas.  
* Indicadores básicos de progreso.  
* Mejoras de navegación y preferencias.

**Versión 2.0 — Administración y colaboración**

* Panel de administración.  
* Gestión de cuentas y roles.  
* Registro de acciones administrativas.  
* Compartir listas, si se considera necesario.  
* Funciones de administración principal con permisos controlados.

Las funciones futuras solo deberán incorporarse cuando exista una necesidad concreta y el tiempo disponible permita desarrollarlas y probarlas correctamente.

# **25\. Indicadores de éxito**

Para evaluar el resultado de la práctica se utilizarán los siguientes indicadores:

* El usuario puede completar las operaciones principales de las tareas.  
* Los datos se conservan correctamente en la base de datos.  
* La aplicación diferencia la información de cada cuenta.  
* Las reglas de seguridad impiden operaciones no autorizadas.  
* Los formularios y mensajes de error funcionan adecuadamente.  
* La interfaz se visualiza correctamente en diferentes dispositivos.  
* El código está organizado y puede explicarse durante la presentación.  
* Las pruebas principales se completan sin errores críticos.

# **26\. Glosario**

**MVP:** Producto Mínimo Viable; primera versión de un producto con las funciones indispensables.

**PWA:** Aplicación web progresiva que incorpora características para ofrecer una experiencia similar a la de una aplicación instalada.

**Firebase Authentication:** Servicio que permite gestionar la identidad y el inicio de sesión de los usuarios.

**Cloud Firestore:** Base de datos NoSQL en la nube que almacena información en documentos y colecciones.

**Base de datos:** Sistema organizado para almacenar y consultar información.

**Frontend:** Parte de la aplicación con la que interactúa directamente el usuario.

**Backend:** Parte encargada de procesar operaciones y aplicar controles que no deben depender únicamente de la interfaz.

**Reglas de seguridad:** Condiciones que determinan quién puede consultar o modificar información almacenada.

**Autenticación:** Proceso mediante el cual se verifica la identidad de un usuario.

**Autorización:** Proceso que determina qué acciones puede realizar un usuario autenticado.

**PWA instalable:** Aplicación web que puede añadirse a un dispositivo desde un navegador compatible cuando cumple los requisitos técnicos.

# **27\. Conclusión**

LISTO se plantea como una práctica académica de desarrollo web orientada a la organización de tareas personales. Su primera versión se concentrará en las funciones esenciales: autenticación, creación y administración de tareas, prioridades, fechas límite, filtros y almacenamiento persistente.

El uso de HTML, CSS y JavaScript permitirá desarrollar la interfaz y la lógica de interacción, mientras que Firebase Authentication y Cloud Firestore proporcionarán los servicios necesarios para gestionar las cuentas y almacenar los datos en la nube.

El alcance se ha reducido para evitar complejidades innecesarias, especialmente en la administración de usuarios. Los roles administrativos avanzados se conservarán como posibilidades futuras y no como requisitos obligatorios de la primera versión.

De esta manera, el MVP permitirá demostrar los conocimientos adquiridos durante la práctica, mantener una estructura organizada y establecer una base que pueda ampliarse posteriormente sin perder de vista su objetivo principal: ayudar a los usuarios a organizar sus tareas de manera sencilla, segura y eficiente.

