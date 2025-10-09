<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use function PHPUnit\Framework\isEmpty;

class TaskController extends Controller
{
    public function index(Request $request)
    {

        $user = $request->user();
        if(!$user){
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if ($user->role === 'admin') {
            return Task::all();
        }

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

    public function show(Task $task){
        return $task;
    }

    public function update(Request $request, Task $task){
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }else{
            $data = $request->validate([
                'title' => 'required',
                'description' => 'nullable',
                'user_id' => 'nullable|exists:users,id',
                'is_general' => 'boolean',
            ]);
            $task->update($data);
            return response()->json(['data' => $task,
            'message' => 'task updated successfully.'
            ]);

        }
    }
    public function destroy(Request $request ,Task $task){
        $user = $request->user();
        if($user->role === 'admin') {
            $task->delete();
            return response()->json([
                'message' => 'Task deleted successfully'
            ]);
        }else{
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }

}
