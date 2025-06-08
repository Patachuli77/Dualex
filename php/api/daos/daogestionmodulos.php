<?php
	/**
		DAO de Alumnos por clase.
		Objeto para el acceso a los datos relacionados con los alumnos.
	**/

class DAOGestionModulos{

    public static function verModulosByCurso($curso){
        $sql = "SELECT m.id, m.codigo, m.titulo, m.color_fondo, m.color_letra ";
        $sql .= "FROM Modulo m ";
        $sql .= "JOIN Curso_Modulo mc ON m.id = mc.id_modulo ";
        $sql .= "JOIN Curso c ON mc.id_curso = c.id ";
        $sql .= "WHERE c.codigo = :curso AND m.activo = 1";

        $params = array(':curso' => $curso);
        return BD::seleccionar($sql, $params);
    }

    public static function verModulos(){
        $sql = "SELECT DISTINCT m.id, m.codigo, m.titulo, m.color_fondo, m.color_letra, m.activo, ci.siglas AS siglas_ciclo ";
        $sql .= "FROM Modulo m ";
        $sql .= "JOIN Curso_Modulo cm ON m.id = cm.id_modulo ";
        $sql .= "JOIN Curso c ON cm.id_curso = c.id ";
        $sql .= "JOIN Ciclo_Curso cc ON cc.id_curso = c.id ";
        $sql .= "JOIN Ciclo ci ON cc.id_ciclo = ci.id ";
        $sql .= "WHERE m.activo = 1";
        $params = array();
        return BD::seleccionar($sql, $params);
    }

    public static function verModulosByCiclo($ciclo){
        $sql = "SELECT DISTINCT m.id, m.codigo, m.titulo, m.color_fondo, m.color_letra ";
        $sql .= "FROM Modulo m ";
        $sql .= "JOIN Curso_Modulo cm ON m.id = cm.id_modulo ";
        $sql .= "JOIN Curso c ON cm.id_curso = c.id ";
        $sql .= "JOIN Ciclo_Curso cc ON cc.id_curso = c.id ";
        $sql .= "JOIN Ciclo ci ON cc.id_ciclo = ci.id ";
        $sql .= "WHERE ci.id = :id_ciclo AND m.activo = 1";

        $params = array(':id_ciclo' => $ciclo);
        return BD::seleccionar($sql, $params);
    }

    public static function insertarModulo($modulo){
        
        
        BD::iniciarTransaccion();
        
        $sqlOrden = "SELECT COALESCE(MAX(orden), 0) + 1 AS nuevo_orden FROM Modulo";
        $resultadoOrden = BD::seleccionar($sqlOrden, []);
        $nuevoOrden = isset($resultadoOrden[0]['nuevo_orden']) ? (int)$resultadoOrden[0]['nuevo_orden'] : 1;

        //die(json_encode($nuevoOrden));
    
        $sql = "INSERT INTO Modulo (codigo, titulo, color_fondo, color_letra, orden) ";
        $sql .= "VALUES (:codigo, :titulo, :color_fondo, :color_letra, :orden)";

        $params = array(
            ':codigo' => $modulo->codigo,
            ':titulo' => $modulo->titulo,
            ':color_fondo' => $modulo->color_fondo,
            ':color_letra' => $modulo->color_letra,
            ':orden' => $nuevoOrden
        );


        $modulo->id = BD::insertar($sql, $params);

        if (!$modulo->id) {
            throw new Exception("Error: No se obtuvo el ID del modulo.");
        }

         // Obtener los cursos asociados al ciclo
        $sqlCursos = "SELECT id_curso FROM Ciclo_Curso WHERE id_ciclo = :id_ciclo";
        $paramsCursos = array(':id_ciclo' => $modulo->ciclo);
        $cursos = BD::seleccionar($sqlCursos, $paramsCursos);

        // Insertar la relación en Curso_Modulo
        foreach ($cursos as $curso) {
            $sqlRelacion = "INSERT INTO Curso_Modulo (id_curso, id_modulo) VALUES (:id_curso, :id_modulo)";
            $paramsRelacion = array(
                ':id_curso' => $curso['id_curso'],
                ':id_modulo' => $modulo->id
            );
            BD::insertar($sqlRelacion, $paramsRelacion);
        }


        if (!empty($modulo->profesores) && is_array($modulo->profesores)) {
            foreach ($modulo->profesores as $id_profesor) {
                $sqlProfesor = "INSERT INTO Modulo_Profesor (id_modulo, id_profesor) VALUES (:id_modulo, :id_profesor)";
                $paramsProfesor = array(
                    ':id_modulo' => $modulo->id,
                    ':id_profesor' => $id_profesor
                );
                BD::insertar($sqlProfesor, $paramsProfesor);
            }
        }
    
        
        if (!BD::commit())
            throw new Exception('No se pudo confirmar la transacción.');
    }
    
    public static function actualizarModulo($modulo){
        
        
        BD::iniciarTransaccion();
    
        // 1. Actualizar la tabla Modulo
        $sql = "UPDATE Modulo SET ";
        $sql .= "codigo = :codigo, ";
        $sql .= "titulo = :titulo, ";
        $sql .= "color_fondo = :color_fondo, ";
        $sql .= "color_letra = :color_letra ";
        $sql .= "WHERE id = :id";
        
        $params = array(
            ':codigo' => $modulo->codigo,
            ':titulo' => $modulo->titulo,
            ':color_fondo' => $modulo->color_fondo,
            ':color_letra' => $modulo->color_letra,
            ':id' => $modulo->id
        );

    BD::ejecutar($sql, $params);

    /// 2. Eliminar relaciones antiguas en Curso_Modulo
    $sqlDeleteCursos = "DELETE FROM Curso_Modulo WHERE id_modulo = :id_modulo";
    BD::ejecutar($sqlDeleteCursos, [':id_modulo' => $modulo->id]);

    // 3. Insertar nuevas relaciones Curso_Modulo
    $sqlCursos = "SELECT id_curso FROM Ciclo_Curso WHERE id_ciclo = :id_ciclo";
    $paramsCursos = array(':id_ciclo' => $modulo->ciclo);
    $cursos = BD::seleccionar($sqlCursos, $paramsCursos);


    foreach ($cursos as $curso) {
        $sqlRelacion = "INSERT INTO Curso_Modulo (id_curso, id_modulo) VALUES (:id_curso, :id_modulo)";
        $paramsRelacion = array(
            ':id_curso' => $curso['id_curso'],
            ':id_modulo' => $modulo->id
        );
        BD::insertar($sqlRelacion, $paramsRelacion);
    }

    // 4. Eliminar relaciones antiguas en Modulo_Profesor
    $sqlDeleteProfesores = "DELETE FROM Modulo_Profesor WHERE id_modulo = :id_modulo";
    BD::ejecutar($sqlDeleteProfesores, [':id_modulo' => $modulo->id]);

    // 5. Insertar nuevas relaciones Modulo_Profesor
    if (!empty($modulo->profesores) && is_array($modulo->profesores)) {
        foreach ($modulo->profesores as $id_profesor) {
            $sqlProfesor = "INSERT INTO Modulo_Profesor (id_modulo, id_profesor) VALUES (:id_modulo, :id_profesor)";
            $paramsProfesor = array(
                ':id_modulo' => $modulo->id,
                ':id_profesor' => $id_profesor
            );
            BD::insertar($sqlProfesor, $paramsProfesor);
        }

       if (!BD::commit()) {
            error_log("Fallo al hacer commit.");
            throw new Exception("No se pudo hacer commit");
}
    }
    }

    public static function eliminarModulo($id){
        $sql = "UPDATE Modulo ";
        $sql .= "SET activo = 0 ";
        $sql .= "WHERE id = :id";

        $params = array(':id' => $id);
        BD::ejecutar($sql, $params);
    }



}