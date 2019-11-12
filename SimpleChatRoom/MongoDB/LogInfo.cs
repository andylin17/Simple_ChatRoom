using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace SimpleChatRoom.MongoDB
{
    public class LogInfo
    {
        [BsonId]
        public string Account { get; set; }
        [BsonElement("Password")]
        public string Password { get; set; }
        //[BsonRepresentation(BsonType.Array)]
        public string Picture { get; set; }
        public List<string> index { get; set; }
    }
}
