<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use App\Models\Page;
use Illuminate\Http\Request;
use ZipArchive;

class PageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
        $this->middleware('verified');
    }

    public function create($projectId, Request $request)
    {
        $project = Project::find($projectId);
        if ($project->userId !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized. You do not own this project!'], 401);
        }

        $page = Page::make($request->all());
        $page->projectId = $projectId;
        $page->save();
        return response()->json(['page' => $page]);
    }

    /*
      Return all pages of a project
    */
    public function getAll($projectId)
    {
        $project = Project::find($projectId);
        if ($project->userId !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized. You do not own this project!'], 401);
        }

        return response()->json(['pages' => $project->pages]);
    }

    /*
      Return a specific page
    */
    public function get($id)
    {
        $page = Page::find($id);
        if ($page->project->userId !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized. You do not own this project!'], 401);
        }

        return response()->json(['page' => $page]);
    }

    /*
      Delete a page
    */
    public function delete($pageId)
    {
        $page = Page::find($pageId);
        if ($page->project->userId !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized. You do not own this project!'], 401);
        }

        $page->delete();
        return response()->json(['page' => $page]);
    }

    /*
      Update a page
    */
    public function update($pageId, Request $request)
    {
        $page = Page::find($pageId);
        if ($page->project->userId !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized. You do not own this project!'], 401);
        }

        $page->update($request->all());
        $page->save();
        return response()->json(['page' => $page]);
    }

    public function generateCode(Request $request)
    {
        $page = $request->input('page');
        $components = $request->input('components');
        if (Page::find($page['id'])->project->userId !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized. You do not own this project!'], 401);
        }
        $fileName = 'Page' . $page['id'] . '.zip';
        $zip = new ZipArchive();
        if ($zip->open(public_path($fileName), ZipArchive::CREATE) === TRUE) {
            // add page main file (ex. 'Home/Home.js')
            $zip->addFromString('src/' . $page['name'] . '/' . $page['name'] . '.js', $page['content']);
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
