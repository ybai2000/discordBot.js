let recorder = {repet: [], data: [], channel: [], member: []}

module.exports={
    
    

    async fudu(message){
        if (!recorder.channel.includes(message.channel.id)) {
            recorder.channel.push(message.channel.id)
            recorder.data.push(message.content)
            recorder.member.push([message.author.id])
            recorder.repet.push(0)
          }
          else {
            var index = recorder.channel.indexOf(message.channel.id)
            if (recorder.data[index] == message.content) {
              if (!recorder.member[index].includes(message.author.id)) {
                //if (true) {
                recorder.repet[index] += 1
                recorder.member[index].push(message.author.id)
                if (recorder.repet[index] == 2) {
                  message.channel.send(message.content)
                  recorder.repet[index] = 0
                  recorder.data[index] = ''
                  recorder.member[index] = []
                }
              }
            }
            else {
              recorder.data[index] = message.content
              recorder.repet[index] = 0
              recorder.member[index] = [message.author.id]
            }
          }
    }
}