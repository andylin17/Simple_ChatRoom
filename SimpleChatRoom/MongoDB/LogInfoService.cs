using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleChatRoom.MongoDB
{
    public class LogInfoService
    {
        private IMongoCollection<LogInfo> _login;

        public LogInfoService()
        {
            var databaseName = "chat";
            var connectionString = "mongodb+srv://sa:!QAZzaq1@project1-hl1go.gcp.mongodb.net/test?retryWrites=true&w=majority";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);

            _login = database.GetCollection<LogInfo>("Loginfo");
        }

        public List<LogInfo> Get() =>
            _login.Find(log => true).ToList();
        public LogInfo Get(string id) =>
            _login.Find(log => log.Account == id).FirstOrDefault();
        public List<LogInfo> GetAnother(string id) =>
            _login.Find(log => log.Account != id).ToList();
        public LogInfo Get(string Account, string Password) =>
            _login.Find<LogInfo>(log => log.Account == Account && log.Password== Password).FirstOrDefault();
        public LogInfo Create(LogInfo log)
        {
            _login.InsertOne(log);
            return log;
        }

        public void Update(string id, LogInfo login) =>
            _login.ReplaceOne(log => log.Account == id, login);

        public void Remove(LogInfo login) =>
            _login.DeleteOne(log => log.Account == login.Account);

        public void Remove(string id) =>
            _login.DeleteOne(log => log.Account == id);
    }
}
