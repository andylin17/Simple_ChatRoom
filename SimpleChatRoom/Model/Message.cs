using System;

namespace SimpleChatRoom.Model
{
    public class Message
    {
        public string from { get; set; }
        public string text { get; set; }
        public DateTime time { get; set; }
    }
}
