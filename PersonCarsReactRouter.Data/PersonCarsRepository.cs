using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonCarsReactRouter.Data
{
    public class PersonCarsRepository
    {
        private readonly string _connectionString;

        public PersonCarsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Add(person);
            context.SaveChanges();
        }

        public void AddCar(Car car)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Add(car);
            context.SaveChanges();
        }

        public void DeleteCarsForPerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Cars WHERE PersonId = {id}");
        }

        public Person GetPersonById(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }

        public List<Car> GetCars(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.Cars.Where(p => p.PersonId == id).ToList();
        }
    }
}
