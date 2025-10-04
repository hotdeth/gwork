<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            return Task::all();
        }

        // member → see his tasks + general tasks
        return Task::where('is_general', true)
            ->orWhere('user_id', $user->id)
            ->get();
    }

    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'user_id' => 'nullable|exists:users,id',
            'is_general' => 'boolean',
        ]);

        $task = Task::create($data);

        return response()->json($task, 201);
    }

}
