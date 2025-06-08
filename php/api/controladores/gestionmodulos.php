<?php
/**
	Controlador de Modulos.
**/
require_once('./daos/daogestionmodulos.php');

class GestionModulos{

    /**
    Devuelve la lista de ciclos.
    @param $pathParams {Array} No utilizado
    @param $queryParams {Array} Contiene el código del curso
    @param $usuario {Usuario} No utilizado
    @return {Array[Ciclo]}
     **/
    function get($pathParams, $queryParams, $usuario){
        $resultado = [];
        if (isset($queryParams['curso'])){
            $resultado = DAOGestionModulos::verModulosByCurso($queryParams['curso']);
        } elseif (isset($queryParams['ciclo'])) {
            $resultado = DAOGestionModulos::verModulosByCiclo($queryParams['ciclo']);
        } else{

            $resultado = DAOGestionModulos::verModulos();
        }
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }

   function delete($pathParams, $queryParams, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionModulos::eliminarModulo($pathParams[0]);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function post($pathParams, $queryParams, $modulo, $usuario){
       
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionModulos::insertarModulo($modulo);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function put($pathParams, $queryParams, $modulo, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionModulos::actualizarModulo($modulo);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

}
