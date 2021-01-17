import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entitiy';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService : MoviesService){}

    @Get()
    getAll() : Movie[]{
        return this.moviesService.getAll();
    }

    // @Get("/search")
    // search(@Query("year") searchingYear : string){
    //     return "This will searching for a movie made after : " + searchingYear;
    // }

    @Get("/:id")
    getOne(@Param("id") movieCode : number) : Movie{
        return this.moviesService.getOne(movieCode);
    }

    @Post()
    create(@Body() movieData : CreateMovieDto){
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param("id") movieCode : number){
        return this.moviesService.deleteOne(movieCode);
    }

    @Patch("/:id")
    path(@Param("id") movieCode : number, @Body() updateData){
       return this.moviesService.update(movieCode, updateData);
    }
}
