<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['create']]);
    }

    /*
      Create a new user
    */
    public function create(Request $request)
    {
        $this->validate($request, [
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:6'],
        ]);
        $user = User::make($request->all());
        $user->password = app('hash')->make($request->input('password'));
        $user->save();
        event(new Registered($user));
        return response()->json(['user' => $user]);
    }
}
