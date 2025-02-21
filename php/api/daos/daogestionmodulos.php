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
        $sql .= "WHERE c.codigo = :curso ";

        $params = array(':curso' => $curso);
        return BD::seleccionar($sql, $params);
    }

    

}