<?php
/**
	Controlador de alumnos.
**/
require_once('./daos/daogestionalumnos.php');

class GestionAlumnos{

    /**
    Devuelve la lista de ciclos.
    @param $pathParams {Array} No utilizado
    @param $queryParams {Array} Contiene el código del curso
    @param $usuario {Usuario} No utilizado
    @return {Array[Ciclo]}
     **/
    function get($pathParams, $queryParams, $usuario){
         if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
                $resultado = DAOGestionAlumnos::verAlumnos(); 
                header('Content-type: application/json; charset=utf-8');
                header('HTTP/1.1 200 OK');  
                
                echo json_encode($resultado);
         } else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }

        
        
    }

    function delete($pathParams, $queryParams, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionAlumnos::eliminarAlumno($pathParams[0]);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function post($pathParams, $queryParams, $alumno, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador') {
            
            // Caso 1: Alta múltiple por archivo Excel
        if (isset($_FILES['archivo'])) {
            $archivo = $_FILES['archivo'];

            if ($archivo['error'] === UPLOAD_ERR_OK) {
                $ok = DAOGestionAlumnos::insertarAlumnosDesdeExcel($archivo['tmp_name']);

                if ($ok) {
                    header('HTTP/1.1 200 OK');
                } else {
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['error' => 'Error al procesar el archivo.']);
                }
            } else {
                header('HTTP/1.1 422 Unprocessable Entity');
                echo json_encode(['error' => 'Archivo no recibido correctamente.']);
            }

            die();
        }

            // Caso 2: Alta de un solo alumno por JSON
            if (isset($alumno->nombre)) {
                DAOGestionAlumnos::insertarAlumno($alumno);
                header('HTTP/1.1 200 OK');
                die();
            }
            
        
        
        
        
        }else{
            header('HTTP/1.1 401 Unauthorized');
            die();

        }
        // Ningún caso válido
        header('HTTP/1.1 422 Unprocessable Entity');
        echo json_encode(['error' => 'Datos no válidos.']);
        die();
    }

    function put($pathParams, $queryParams, $alumno, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionAlumnos::actualizarAlumno($alumno);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

}
