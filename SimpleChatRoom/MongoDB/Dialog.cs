using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SimpleChatRoom.Model;

namespace SimpleChatRoom.MongoDB
{
    public class Dialog
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        public string user_A { get; set; }
        public string user_B { get; set; }
        public List<Message> messagelist { get; set; }
    }
}
