<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\VerificationController;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Email Verification Routes...
$router->get('/email/verify', [VerificationController::class, 'show'])->name('verification.notice');
$router->get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');
$router->get('/email/resend', [VerificationController::class, 'resend'])->name('verification.send');

$router->post('/users/create', [UserController::class, 'create']);

$router->post('/login', [AuthController::class, 'login']);
$router->post('/logout', [AuthController::class, 'logout']);
$router->post('/verifyToken', [AuthController::class, 'verifyToken']);

$router->get('/projects', [ProjectController::class, 'get']);
$router->post('/projects/create', [ProjectController::class, 'create']);
$router->post('/projects/generateCode', [ProjectController::class, 'generateCode']);

$router->get('/projects/{projectId}/pages', [PageController::class, 'getAll']);
$router->get('/pages/{id}', [PageController::class, 'get']);
$router->post('/projects/{projectId}/pages/create', [PageController::class, 'create']);
$router->post('/pages/{pageId}/delete', [PageController::class, 'delete']);
$router->post('/pages/{pageId}/update', [PageController::class, 'update']);
$router->post('/pages/generateCode', [PageController::class, 'generateCode']);
