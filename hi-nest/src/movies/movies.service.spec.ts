import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should be 4", () =>{
    expect(2+2).toEqual(4);
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", ()=>{
    it("should return a movie", () =>{
      service.create({
        "title":"Test Movie",
        "genres": ["Test"],
        "year":2000
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw 404 error", () =>{
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("deleteOne", () =>{
    it("should return a movie", () =>{
      service.create({
        "title":"Test Movie",
        "genres": ["Test"],
        "year":2000
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      //지운후의 길이가 지우기 전의 길이에서 -1과 같아야 된다는 의미
      expect(afterDelete).toBeLessThan(allMovies);
    });
    it("should return 404", () =>{
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        "title":"Test Movie",
        "genres": ["Test"],
        "year":2000
      });
      const afterCreate = service.getAll().length;
      //console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        "title":"Test Movie",
        "genres": ["Test"],
        "year":2000
      });
      service.update(1, {
        title:"Update Test"
      });
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Update Test");
    });
    it("should throw a NotFoundException", () =>{
      try{
        service.update(999, {
          title:"Update Test"
        });
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
