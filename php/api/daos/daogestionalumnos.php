<?php
	/**
		DAO de Alumnos por clase.
		Objeto para el acceso a los datos relacionados con los alumnos.
	**/
require_once __DIR__ . '/../vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

class DAOGestionAlumnos{

    public static function verAlumnos(){
        $sql = "SELECT a.id, u.nombre, u.apellidos, u.email, c.codigo, c.id AS idCurso, ";
        $sql .= "a.aviso, a.nia, a.dni, a.situacion_matricula, a.telefono, a.es_repetidor, ";
        $sql .= "a.materias_matricula, a.materias_pendientes, a.expediente_centro, a.tipo_regimen, a.bilingue ";
        $sql .= "FROM Alumno a ";
        $sql .= "JOIN Curso c ON a.id_curso = c.id ";
        $sql .= "JOIN Usuario u ON u.id = a.id ";
        $params = array();
    
    return BD::seleccionar($sql, $params);
    }

    public static function eliminarAlumno($id){
        $sql = "DELETE FROM Usuario ";
        $sql .= "WHERE id = :id";

        $params = array(':id' => $id);
        BD::ejecutar($sql, $params);
    }

    public static function insertarAlumno($alumno){
    		BD::iniciarTransaccion();
        $sql = "INSERT INTO Usuario (nombre, apellidos, email) ";
        $sql .= "VALUES (:nombre, :apellidos, :email)";

        $params = array(
            ':nombre' => $alumno->nombre,
            ':apellidos' => $alumno->apellidos,
            ':email' => $alumno->email
        );
        $usuarioId = BD::ejecutar($sql, $params, true);
        $sql = "INSERT INTO Alumno (
                id, id_curso, aviso, nia, dni, situacion_matricula, telefono, 
                es_repetidor, materias_matricula, materias_pendientes, 
                expediente_centro, tipo_regimen, bilingue
            ) VALUES (
                :id, :id_curso, :aviso, :nia, :dni, :situacion_matricula, :telefono, 
                :es_repetidor, :materias_matricula, :materias_pendientes, 
                :expediente_centro, :tipo_regimen, :bilingue
            )";
        $params = array(
        ':id' => $usuarioId,
        ':id_curso' => $alumno->curso,
        ':aviso' => $alumno->aviso,
        ':nia' => $alumno->nia,
        ':dni' => $alumno->dni,
        ':situacion_matricula' => $alumno->situacion_matricula,
        ':telefono' => $alumno->telefono,
        ':es_repetidor' => (int)$alumno->repetidor,
        ':materias_matricula' => $alumno->materias_matricula,
        ':materias_pendientes' => $alumno->materias_pendientes,
        ':expediente_centro' => $alumno->expediente, 
        ':tipo_regimen' => $alumno->regimen,
        ':bilingue' => (int)$alumno->bilingue
    );


        BD::ejecutar($sql, $params);
        
        if (!BD::commit())
        	throw new Exception('No se pudo confirmar la transacción.');
    }
    public static function insertarAlumnosDesdeExcel($rutaArchivo){
        try {
        $spreadsheet = IOFactory::load($rutaArchivo);
        $hoja = $spreadsheet->getActiveSheet();
        $filas = $hoja->toArray();

        for ($i = 1; $i < count($filas); $i++) {
            $fila = $filas[$i];

            // Separar "Apellidos, Nombre"
            $alumnado = explode(',', $fila[1] ?? '');
            $apellidos = trim($alumnado[0] ?? '');
            $nombre = trim($alumnado[1] ?? '');

            // Buscar ID del curso por código (columna "grupo" en Excel)
            $codigoCurso = trim($fila[2] ?? '');
            error_log($codigoCurso);
            $sqlCurso = "SELECT id FROM Curso WHERE LOWER(codigo) = LOWER(:codigo) LIMIT 1";
            $resultado = BD::seleccionar($sqlCurso, [':codigo' => $codigoCurso]);
            $idCurso = $resultado[0]['id'] ?? null;

            if (!$idCurso) {
               // error_log("Fila $i: Curso con código '$codigoCurso' no encontrado, se omite."); //comentado para no saturar el error_log
                continue;
            }

            // Validación básica de campos obligatorios
            if (!$nombre || !$apellidos || !$fila[4]) {
               // error_log("Fila $i incompleta (nombre/apellidos/email), se omite."); //comentado para no saturar el error_log
                continue;
            }

            $alumno = (object)[
                'nombre' => $nombre,
                'apellidos' => $apellidos,
                'email' => trim($fila[4] ?? ''),
                'curso' => $idCurso,
                'nia' => trim($fila[3] ?? ''),
                'dni' => trim($fila[5] ?? ''),
                'situacion_matricula' => trim($fila[6] ?? ''),
                'telefono' => trim($fila[7] ?? ''),
                'repetidor' => in_array(mb_strtolower(trim($fila[8])), ['sí', 'si']) ? 1 : 0,
                'materias_matricula' => trim($fila[9] ?? ''),
                'materias_pendientes' => trim($fila[10] ?? ''),
                'expediente' => trim($fila[11] ?? ''),
                'regimen' => trim($fila[12] ?? ''),
                'bilingue' => in_array(mb_strtolower(trim($fila[13])), ['sí', 'si']) ? 1 : 0,
                'aviso' => trim($fila[0] ?? '')
            ];

            try {
                self::insertarAlumno($alumno);
                error_log("Fila $i insertada correctamente.");
            } catch (Exception $e) {
                error_log("Error al insertar fila $i: " . $e->getMessage());
            }
        }

        return true;

    } catch (Exception $e) {
        error_log("Error al leer el Excel: " . $e->getMessage());
        return false;
    }
}





    

    public static function actualizarAlumno($alumno){
		    BD::iniciarTransaccion();
        
       // Actualizar tabla Usuario
        $sql = "UPDATE Usuario SET ";
        $sql .= "nombre = :nombre, ";
        $sql .= "apellidos = :apellidos, ";
        $sql .= "email = :email ";
        $sql .= "WHERE id = :id";

        $params = array(
            ':nombre' => $alumno->nombre,
            ':apellidos' => $alumno->apellidos,
            ':email' => $alumno->email,
            ':id' => $alumno->id
        );

        BD::ejecutar($sql, $params);

        $sql = "UPDATE Alumno SET ";
        $sql .= "id_curso = :curso, ";
        $sql .= "dni = :dni, ";
        $sql .= "nia = :nia, ";
        $sql .= "situacion_matricula = :situacion_matricula, ";
        $sql .= "telefono = :telefono, ";
        $sql .= "materias_matricula = :materias_matricula, ";
        $sql .= "materias_pendientes = :materias_pendientes, ";
        $sql .= "expediente_centro = :expediente_centro, ";
        $sql .= "tipo_regimen = :tipo_regimen, ";
        $sql .= "aviso = :aviso, ";
        $sql .= "es_repetidor = :repetidor, ";
        $sql .= "bilingue = :bilingue ";
        $sql .= "WHERE id = :id";

        $params = array(
            ':curso' => $alumno->curso,
            ':dni' => $alumno->dni,
            ':nia' => $alumno->nia,
            ':situacion_matricula' => $alumno->situacion_matricula,
            ':telefono' => $alumno->telefono,
            ':materias_matricula' => $alumno->materias_matricula,
            ':materias_pendientes' => $alumno->materias_pendientes,
            ':expediente_centro' => $alumno->expediente,
            ':tipo_regimen' => $alumno->regimen,
            ':aviso' => $alumno->aviso,
            ':repetidor' => ($alumno->repetidor == 'sí' || $alumno->repetidor == '1' || $alumno->repetidor === true) ? 1 : 0,
            ':bilingue' => ($alumno->bilingue == 'sí' || $alumno->bilingue == '1' || $alumno->bilingue === true) ? 1 : 0,
            ':id' => $alumno->id
        );

        BD::ejecutar($sql, $params);
        if (!BD::commit())
        	        	throw new Exception('No se pudo confirmar la transacción.');
        else
        	return true;
    
    }

}
