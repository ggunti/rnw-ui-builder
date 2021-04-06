<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
        $this->middleware('verified');
    }

    public function create(Request $request)
    {
        $project = Project::make($request->all());
        $project->userId = auth()->user()->id;
        $project->save();
        return response()->json(['project' => $project]);
    }

    /*
      Return all projects of the user
    */
    public function get(Request $request)
    {
        $projects = auth()->user()->projects;

        return response()->json(['projects' => $projects]);
    }
}
