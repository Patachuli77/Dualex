<?php
/**
	Controlador de profesores.
**/
require_once('./daos/daogestionprofesores.php');

class gestionprofesores{

    /**
    Devuelve la lista de ciclos.
    @param $pathParams {Array} No utilizado
    @param $queryParams {Array} Contiene el código del curso
    @param $usuario {Usuario} No utilizado
    @return {Array[Ciclo]}
     **/
    function get($pathParams, $queryParams, $usuario){
        if ($usuario->rol == 'coordinador'){
            if(isset($queryParams['modulo'])){
                error_log("ID del módulo recibido: " . $queryParams['modulo']);
                $resultado = DAOGestionProfesores::verProfesoresByModulo((object)['id' => $queryParams['modulo']]);
                $json = json_encode($resultado);
                header('Content-type: application/json; charset=utf-8');
                header('HTTP/1.1 200 OK');
                echo $json;
                die();

            } else{
                $resultado = DAOGestionProfesores::verProfesores();
                $json = json_encode($resultado);
                header('Content-type: application/json; charset=utf-8');
                header('HTTP/1.1 200 OK');
                echo $json;
                die();
            }
        	
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function delete($pathParams, $queryParams, $usuario){
        if ($usuario->rol == 'coordinador'){
            DAOGestionProfesores::eliminarProfesor($pathParams[0]);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function post($pathParams, $queryParams, $profesor, $usuario){
        if ($usuario->rol == 'coordinador'){
            DAOGestionProfesores::insertarProfesor($profesor);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function put($pathParams, $queryParams, $profesor, $usuario){
        if ($usuario->rol == 'coordinador'){
            DAOGestionProfesores::actualizarProfesor($profesor);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

}
