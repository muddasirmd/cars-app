<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['color'=> 'Red', 'make'=>'Kia', 'model'=>'Sportage', 'year'=> '2022', 'registration_no'=>'12345', 'category_id'=> 2],
            ['color'=> 'Black', 'make'=>'Haval', 'model'=>'H6', 'year'=> '2020','registration_no'=>'232333', 'category_id'=> 2],
            ['color'=> 'White', 'make'=>'Honda', 'model'=>'Civic', 'year'=> '2018', 'registration_no'=>'4434333', 'category_id'=> 1],

        ];
        
        Car::insert($data);
    }
}
