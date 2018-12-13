<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('projects', 'ProjectCont@index');
Route::post('projects', 'ProjectCont@store');
Route::get('projects/{id}', 'ProjectCont@show');
Route::put('projects/{project}', 'ProjectCont@markAsCompleted');
Route::post('t', 'TCont@store');
Route::put('t/{task}', 'TCont@markAsCompleted');