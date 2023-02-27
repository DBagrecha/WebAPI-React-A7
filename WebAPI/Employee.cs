using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebAPI
{
    public class Employee
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Country { get; set; }
        public int? AnnualIncome { get; set; }
        public List<string>? EmailIdsList { get; set; }
    }
}