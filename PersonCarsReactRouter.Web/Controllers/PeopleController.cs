using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PersonCarsReactRouter.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonCarsReactRouter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private IConfiguration _configuration;

        public PeopleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("getall")]
        [HttpGet]
        public List<Person> GetAll()
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            return repo.GetAll();
        }

        [Route("getcars")]
        [HttpGet]
        public List<Car> GetCars(int id)
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            return repo.GetCars(id);
        }

        [Route("addperson")]
        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            repo.AddPerson(person);
        }

        [Route("addcar")]
        [HttpPost]
        public void AddCar(Car car)
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            repo.AddCar(car);
        }

        [Route("deletecars")]
        [HttpPost]
        public void DeleteCars(int id)
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            repo.DeleteCarsForPerson(id);
        }

        [Route("getbyid")]
        [HttpGet]
        public Person GetById(int id)
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            return repo.GetPersonById(id);
        }
    }
}
