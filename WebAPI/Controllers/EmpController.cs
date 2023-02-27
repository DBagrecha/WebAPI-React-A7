using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using WebAPI;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class EmpController : ControllerBase
    {
        private readonly ILogger<EmpController> _logger;
        private static MongoClient client = new MongoClient("mongodb://localhost:27017");
        private static IMongoDatabase db = client.GetDatabase("A5");
        IMongoCollection<Employee> table = db.GetCollection<Employee>("Emp");

        public EmpController(ILogger<EmpController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<Employee> Get() =>
            table.Find(FilterDefinition<Employee>.Empty).ToList();


        [HttpGet("{id:length(24)}")]
        public Employee? Get(string id)
        {
            if (id == null)
            {
                return null;
            }
            var emp = table.Find(x => x.Id == id).FirstOrDefault();

            if (emp is null)
            {
                return null;
            }

            return emp;
        }

        [HttpPost]
        [Route("add")]
        public void Post(Employee newEmp)
        {
            if (newEmp.Name == null)
            {
                return;
            }
            table.InsertOne(newEmp);
        }

        [HttpPut("{id:length(24)}")]
        public void Update(string id, Employee updatedEmp)
        {
            if (id == null)
            {
                return;
            }
            var emp = table.Find(x => x.Id == id).FirstOrDefault();
            if (emp is null)
            {
                return;
            }
            updatedEmp.Id = emp.Id;
            table.ReplaceOne(x => x.Id == id, updatedEmp);
            return;
        }

        [HttpDelete("{id:length(24)}")]
        public void Delete(string id)
        {
            if (id == null)
            {
                return;
            }
            var emp = table.Find(x => x.Id == id).FirstOrDefault();
            if (emp is null)
            {
                return;
            }
            table.DeleteOne(x => x.Id == id);
            return;
        }
    }
}