<?php
	/**
		DAO de Actividades por modulo.
		Objeto para el acceso a los datos relacionados con los actividades.
	**/

class DAOGestionActividades{

    public static function verActividadesByModulo($modulo){
        $sql = "SELECT a.id, a.titulo, a.descripcion, GROUP_CONCAT(DISTINCT m.codigo ORDER BY m.codigo SEPARATOR ', ') AS modulos
            FROM Actividad a
            JOIN Actividad_Modulo am ON am.id_actividad = a.id
            JOIN Modulo m ON m.id = am.id_modulo
            WHERE a.id IN (
                SELECT a.id FROM Actividad a
                JOIN Actividad_Modulo am ON am.id_actividad = a.id
                JOIN Modulo m ON m.id = am.id_modulo
                WHERE m.codigo = :modulo
            )
            GROUP BY a.id";

        $params = array(':modulo' => $modulo);
        return BD::seleccionar($sql, $params);
    }

    

    public static function eliminarActividad($id){
      
        //Tabla actividad
        $sql = "DELETE FROM Actividad ";
        $sql .= "WHERE id = :id";

        $params = array(':id' => $id);
        BD::ejecutar($sql, $params);
        //Tabla Actividad Modulo
        $sql = "DELETE FROM Actividad_Modulo WHERE id_actividad = :id";
        $params = [':id' => $actividad->id];


        //Tabla Actividad Curso
        $sql = "DELETE FROM Actividad_Curso WHERE id_actividad = :id";
        $params = array(':id' => $id);
        BD::ejecutar($sql, $params);

    }

    public static function insertarActividad($actividad){

    	BD::iniciarTransaccion();
        
            // Insertar la actividad
            $sql = "INSERT INTO Actividad (titulo, descripcion) VALUES (:titulo, :descripcion)";
            $params = [
                ':titulo' => $actividad->titulo,
                ':descripcion' => $actividad->descripcion,
            ];
            $actividad->id = BD::insertar($sql, $params);
        
            // Verificar si el ID de la actividad se obtuvo correctamente
            if (!$actividad->id) {
                throw new Exception("Error: No se obtuvo el ID de la actividad.");
            }
        
            // Insertar módulos asociados 
           
                $sql = 'INSERT INTO Actividad_Modulo (id_actividad, id_modulo) VALUES ';
                $values = [];
                $params = [":actividad_id" => $actividad->id];  
        
                foreach ($actividad->modulos as $index => $modulo) {
                    $values[] = "(:actividad_id, :campo_$index)";
                    $params[":campo_$index"] = $modulo;
                }
                $sql .= implode(",", $values);
        
                BD::ejecutar($sql, $params);
          

            //Insertar valores en la tabla actividad curso
            $sql = "
            INSERT INTO Actividad_Curso (id_actividad, id_curso, orden)
            SELECT DISTINCT 
                    :actividad_id, 
                    cm.id_curso,
                    COALESCE( 
                        (SELECT MAX(ac.orden) + 1 FROM Actividad_Curso ac WHERE ac.id_curso = cm.id_curso), 
                        1 
                    ) AS nuevo_orden
                FROM Curso_Modulo cm
                WHERE cm.id_modulo IN (
                    SELECT am.id_modulo FROM Actividad_Modulo am WHERE am.id_actividad = :actividad_id
                )
            ";
            
            $params = [":actividad_id" => $actividad->id];
            
            BD::ejecutar($sql, $params);

            if (!BD::commit())
        	    throw new Exception('No se pudo confirmar la transacción.');
        
    }

    public static function actualizarActividad($actividad){
		BD::iniciarTransaccion();
        //actualizar tabla actividad
        $sql = "UPDATE Actividad ";
        $sql .= "SET titulo = :titulo, descripcion = :descripcion ";
        $sql .= "WHERE id = :id";
        $params = [
            ':titulo' => $actividad->titulo,
            ':descripcion' => $actividad->descripcion,
            ':id' => $actividad->id
        ];
       
        BD::ejecutar($sql, $params);
        //actualizar tabla actividad modulo
        //eliminamos los modulos asociados a la actividad
        $sql = "DELETE FROM Actividad_Modulo WHERE id_actividad = :id";
        $params = [':id' => $actividad->id];
        
        BD::ejecutar($sql, $params);

        // insertamos nuevos modulos
        
        $sql = "INSERT INTO Actividad_Modulo (id_actividad, id_modulo) VALUES ";
        $values = [];
        $params = [":actividad_id" => $actividad->id];

        foreach ($actividad->modulos as $index => $modulo) {
            $values[] = "(:actividad_id, :modulo_$index)";
            $params[":modulo_$index"] = $modulo;
        }

        $sql .= implode(",", $values);
      
        BD::ejecutar($sql, $params);
        
        //eliminar los cursos relacionados con la actividad
        $sql = "DELETE FROM Actividad_Curso WHERE id_actividad = :id";
        $params = [':id' => $actividad->id];
     
        BD::ejecutar($sql, $params);

        //insertar nuevos cursos
        $sql = "
        INSERT INTO Actividad_Curso (id_actividad, id_curso, orden)
        SELECT DISTINCT 
                :actividad_id, 
                cm.id_curso,
                COALESCE( 
                    (SELECT MAX(ac.orden) + 1 FROM Actividad_Curso ac WHERE ac.id_curso = cm.id_curso), 
                    1 
                ) AS nuevo_orden
            FROM Curso_Modulo cm
            WHERE cm.id_modulo IN (
                SELECT am.id_modulo FROM Actividad_Modulo am WHERE am.id_actividad = :actividad_id
            )
        ";
        
        $params = [":actividad_id" => $actividad->id];
       
        BD::ejecutar($sql, $params);
        if (!BD::commit())
        	        	throw new Exception('No se pudo confirmar la transacción.');
        else
        	return true;
    
    }

}
