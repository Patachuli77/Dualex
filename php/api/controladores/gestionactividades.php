<?php
/**
	Controlador de Actividades.
**/
require_once('./daos/daogestionactividades.php');

class GestionActividades{

    /**
    Devuelve la lista de Actividades.
    @param $pathParams {Array} No utilizado
    @param $queryParams {Array} Contiene el código del modulo
    @param $usuario {Usuario} No utilizado
    @return {Array[Ciclo]}
     **/
    function get($pathParams, $queryParams, $usuario){
        //$resultado = DAOGestionActividades::verActividadesByModulo($queryParams['modulo']);
        $resultado = DAOGestionActividades::verActividades();
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }

    function delete($pathParams, $queryParams, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionActividades::eliminarActividad($pathParams[0]);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function post($pathParams, $queryParams, $actividad, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            
            if (isset($_FILES['archivo'])) {
            $archivo = $_FILES['archivo'];
            
            if ($archivo['error'] === UPLOAD_ERR_OK) {
                $ok = DAOGestionActividades::insertarActividadesDesdeExcel($archivo['tmp_name']);

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
            if (isset($actividad->titulo)) {
                DAOGestionActividades::insertarActividad($actividad);
                header('HTTP/1.1 200 OK');
                die();
            }








        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function put($pathParams, $queryParams, $actividad, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionActividades::actualizarActividad($actividad);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

}