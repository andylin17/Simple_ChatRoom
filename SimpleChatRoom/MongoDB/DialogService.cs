using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SimpleChatRoom.MongoDB
{
    public class DialogService
    {
        private IMongoCollection<Dialog> _dialog;
        private IMongoCollection<LogInfo> _log;
        public DialogService()
        {
            var databaseName = "chat";
            var connectionString = "mongodb+srv://sa:!QAZzaq1@project1-hl1go.gcp.mongodb.net/test?retryWrites=true&w=majority";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);

            _dialog = database.GetCollection<Dialog>("Dialog");
            _log = database.GetCollection<LogInfo>("Loginfo");
        }

        public List<Dialog> Get() =>
            _dialog.Find(x => true).ToList();

        public List<Dialog> Get(string id)
        {
            var a = _log.Find<LogInfo>(x => x.Account == id).FirstOrDefault();
            return _dialog.Find<Dialog>(x => a.index.Contains(x.id)).ToList();//x.id ==a.index[0]).ToList();
        }


        public Dialog Create(Dialog log)
        {
            //log.messagelist = new List<Model.Message>();
            var a = _dialog.Find<Dialog>(x => (x.user_A == log.user_A && x.user_B == log.user_B)||(x.user_A == log.user_B && x.user_B == log.user_A)).ToList();
            if (a.Count > 0)
                throw new Exception("already has value");
            _dialog.InsertOne(log);
            LogInfo info = _log.Find<LogInfo>(x => x.Account == log.user_A).FirstOrDefault();
            info.index.Add(log.id);
            _log.ReplaceOne(x => x.Account == log.user_A, info);
            info = _log.Find<LogInfo>(x => x.Account == log.user_B).FirstOrDefault();
            info.index.Add(log.id);
            _log.ReplaceOne(x => x.Account == log.user_B, info);
            return log;
        }

        public void Update(string id, Dialog dialog) =>
            _dialog.ReplaceOne(log => log.id == id, dialog);

        public void Remove(Dialog dialog) =>
            _dialog.DeleteOne(log => log.id == dialog.id);

        public void Remove(string id) =>
            _dialog.DeleteOne(log => log.id == id);
    }
}
