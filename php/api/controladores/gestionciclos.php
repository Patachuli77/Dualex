<?php
/**
	Controlador de Ciclos.
**/
require_once('./daos/daogestionciclos.php');

class GestionCiclos{

    /**
    Devuelve la lista de Actividades.
    @param $pathParams {Array} No utilizado
    @param $queryParams {Array} Contiene el código del modulo
    @param $usuario {Usuario} No utilizado
    @return {Array[Ciclo]}
     **/
    function get($pathParams, $queryParams, $usuario){
        
         if (isset($queryParams['ciclo'])){
            $resultado = DAOGestionCiclos::getCursosByCiclo($queryParams['ciclo']);
         }else{
            $resultado = DAOGestionCiclos::verCiclos();
        }
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }

    function delete($pathParams, $queryParams, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionCiclos::eliminarCiclo($pathParams[0]);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function post($pathParams, $queryParams, $ciclo, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionCiclos::insertarCiclo($ciclo);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function put($pathParams, $queryParams, $ciclo, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionCiclos::actualizarCiclo($ciclo);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

}