<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use ZipArchive;

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

    public function delete($projectId)
    {
        $project = Project::find($projectId);
        if ($project->userId !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized. You do not own this project!'], 401);
        }
        $project->pages()->delete();
        $project->delete();
        return response()->json(['project' => $project]);
    }

    public function generateCode(Request $request)
    {
        $project = $request->input('project');
        $components = $request->input('components');
        if (Project::find($project['id'])->userId !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized. You do not own this project!'], 401);
        }
        $fileName = 'Proj' . $project['id'] . '.zip';
        $zip = new ZipArchive();
        if ($zip->open(public_path($fileName), ZipArchive::CREATE) === TRUE) {
            // add project pages to 'src/' directory
            collect($project['pages'])->each(function ($page, $key) use ($zip) {
                $zip->addFromString('src/' . $page['name'] . '/' . $page['name'] . '.js', $page['content']);
            });
            // add components to 'common/' directory
            collect($components)->each(function ($comp, $key) use ($zip) {
                $zip->addFromString('src/common/' . $comp['name'] . '.js', $comp['content']);
            });
            // add 'common/index.js' file
            $index = view('templates.common.index', ['components' => $components]);
            $zip->addFromString('src/common/index.js', $index);
            $zip->close();
        }

        return response()->download(public_path($fileName))->deleteFileAfterSend(true);
    }
}
