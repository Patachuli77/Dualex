<?php
	/**
		DAO de Actividades por modulo.
		Objeto para el acceso a los datos relacionados con los actividades.
	**/

class DAOGestionCiclos{



   public static function verCiclos(){
        $sql = "SELECT c.id, c.siglas, c.grado, c.nombre ";
        $sql .= "FROM Ciclo c ";

        $params = array();
        return BD::seleccionar($sql, $params);
    }

    public static function getCursosByCiclo($ciclo){

        

        $sql  = "SELECT c.id AS id_ciclo, c.siglas, c.grado, c.nombre AS nombre_ciclo, ";
        $sql .= "cu.id AS id_curso, cu.codigo, cu.titulo, cu.grado AS grado_curso, cu.color_fondo, cu.color_letra, ";
        $sql .= "u.id AS id_profesor, u.nombre AS nombre_profesor, u.apellidos AS apellidos_profesor ";
        $sql .= "FROM Ciclo c ";
        $sql .= "JOIN Ciclo_Curso cc ON c.id = cc.id_ciclo ";
        $sql .= "JOIN Curso cu ON cc.id_curso = cu.id ";
        $sql .= "JOIN Usuario u ON cu.id_profesor = u.id ";
        $sql .= "WHERE c.id = :id_ciclo ";
        $sql .= "ORDER BY cu.codigo;";
            
        
        $params = array(':id_ciclo' => $ciclo);
        return BD::seleccionar($sql, $params);
    }
    

    public static function eliminarCiclo($id){
      
        BD::iniciarTransaccion();

        
        $sqlCursos = "SELECT id_curso FROM Ciclo_Curso WHERE id_ciclo = :id_ciclo";
    $cursos = BD::seleccionar($sqlCursos, [':id_ciclo' => $id]);

    // Eliminar relaciones en Ciclo_Curso
    $sqlRel = "DELETE FROM Ciclo_Curso WHERE id_ciclo = :id_ciclo";
    BD::ejecutar($sqlRel, [':id_ciclo' => $id]);

    // Eliminar cursos asociados
    if (!empty($cursos)) {
        $idsCursos = array_column($cursos, 'id_curso');
        $in  = str_repeat('?,', count($idsCursos) - 1) . '?';
        $sqlCursosDelete = "DELETE FROM Curso WHERE id IN ($in)";
        BD::ejecutar($sqlCursosDelete, $idsCursos);
    }

    // Eliminar ciclo
    $sql = "DELETE FROM Ciclo WHERE id = :id";
    BD::ejecutar($sql, [':id' => $id]);
    if (!BD::commit()) {
        throw new Exception('No se pudo confirmar la transacción al eliminar ciclo.');
    }
        

    }

    public static function insertarCiclo($ciclo){

    	BD::iniciarTransaccion();
             
            // Insertar la actividad
            $sql = "INSERT INTO Ciclo (siglas, grado, nombre) VALUES (:siglas, :grado, :nombre)";
            $params = [
                ':siglas' => $ciclo->siglas,
                ':grado' => $ciclo->grado,
                ':nombre' => $ciclo->nombre,
            ];
            $ciclo->id = BD::insertar($sql, $params);

            $sqlCurso = "INSERT INTO Curso (codigo, titulo, grado, id_profesor, color_fondo, color_letra)
                     VALUES (:codigo, :titulo, :grado, :id_profesor, :color_fondo, :color_letra)";
        $paramsPrimero = [
            ':codigo'     => $ciclo->codigoPrimero,
            ':titulo'     => $ciclo->nombre,
            ':grado'      => $ciclo->grado,
            ':id_profesor' => $ciclo->idTutorPrimero,
            ':color_fondo' => $ciclo->colorFondoPrimero,
            ':color_letra' => $ciclo->colorLetraPrimero,
        ];
        $idCursoPrimero = BD::insertar($sqlCurso, $paramsPrimero);

        // 3. Insertar curso segundo
        $paramsSegundo = [
            ':codigo'     => $ciclo->codigoSegundo,
            ':titulo'     => $ciclo->nombre,
            ':grado'      => $ciclo->grado,
            ':id_profesor' => $ciclo->idTutorSegundo,
            ':color_fondo' => $ciclo->colorFondoSegundo,
            ':color_letra' => $ciclo->colorLetraSegundo,
        ];
        $idCursoSegundo = BD::insertar($sqlCurso, $paramsSegundo);

        // 4. Insertar en Ciclo_Curso las relaciones
        $sqlRelacion = "INSERT INTO Ciclo_Curso (id_ciclo, id_curso) VALUES (:id_ciclo, :id_curso)";
        BD::insertar($sqlRelacion, [':id_ciclo' => $ciclo->id, ':id_curso' => $idCursoPrimero]);
        BD::insertar($sqlRelacion, [':id_ciclo' => $ciclo->id, ':id_curso' => $idCursoSegundo]);


            if (!BD::commit()){
        	    throw new Exception('No se pudo confirmar la transacción.');
            }
    }

    public static function actualizarCiclo($ciclo){
        BD::iniciarTransaccion();

        // Actualizar tabla Ciclo
        $sqlCiclo = "UPDATE Ciclo SET nombre = :nombre, siglas = :siglas, grado = :grado WHERE id = :id";
        $paramsCiclo = [
            ':nombre' => $ciclo->nombre,
            ':siglas' => $ciclo->siglas,
            ':grado' => $ciclo->grado,
            ':id' => $ciclo->id
        ];
        BD::ejecutar($sqlCiclo, $paramsCiclo);

        // Actualizar curso primero
        $sqlCurso = "UPDATE Curso SET codigo = :codigo, color_fondo = :color_fondo, color_letra = :color_letra, id_profesor = :id_profesor WHERE id = :id";
        $paramsCursoPrimero = [
            ':codigo' => $ciclo->codigoPrimero,
            ':color_fondo' => $ciclo->colorFondoPrimero,
            ':color_letra' => $ciclo->colorLetraPrimero,
            ':id_profesor' => $ciclo->idTutorPrimero,
            ':id' => $ciclo->idCursoPrimero
        ];
        BD::ejecutar($sqlCurso, $paramsCursoPrimero);

        $paramsCursoSegundo = [
        ':codigo' => $ciclo->codigoSegundo,
        ':color_fondo' => $ciclo->colorFondoSegundo,
        ':color_letra' => $ciclo->colorLetraSegundo,
        ':id_profesor' => $ciclo->idTutorSegundo,
        ':id' => $ciclo->idCursoSegundo
        ];
        BD::ejecutar($sqlCurso, $paramsCursoSegundo);

        $sqlDelete = "DELETE FROM Ciclo_Curso WHERE id_ciclo = :id_ciclo";
        BD::ejecutar($sqlDelete, [':id_ciclo' => $ciclo->id]);

        $sqlInsert = "INSERT INTO Ciclo_Curso (id_ciclo, id_curso) VALUES (:id_ciclo, :id_curso)";
        BD::ejecutar($sqlInsert, [':id_ciclo' => $ciclo->id, ':id_curso' => $ciclo->idCursoPrimero]);
        BD::ejecutar($sqlInsert, [':id_ciclo' => $ciclo->id, ':id_curso' => $ciclo->idCursoSegundo]);

        if (!BD::commit()) {
            throw new Exception('No se pudo confirmar la transacción.');
        }
        return true;



    }
       

}
