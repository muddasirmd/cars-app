<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        
        // Validation
        if($request->validated()){

            $input = $request->all();
            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);
    
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['name'] = $user->name;
    
            $response = [
                'success' => true,
                'data' => $success,
                'message' => 'User register successfully'
            ];
    
            return response()->json($response,200);
        }
        else{
            $response = [
                'success' => false,
                'message' => $request->errors()
            ];
            return response()->json($response, 400);
        }
    }

    public function login(Request $request){

        if(Auth::attempt(['email'=>$request->email,'password'=>$request->password])){
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['name'] = $user->name;

            $response = [
                'success' => true,
                'data' => $success,
                'message' => 'User login successfully'
            ];
            return response()->json($response,200);
        }else{
            $response = [
                'success' => false,
                'message' => 'Unauthorised'
            ];
            return response()->json($response);
        }
    }
}
