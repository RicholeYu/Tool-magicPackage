const hexStringToBufferArr = (str)=> {
    let hexA = [],
        length = str.length;
    if (length % 2 != 0) {
        return null;
    }
    length /= 2;
    for (let i = 0, pos = 0; i < length; i++) {
        let oneByteString = str.substr(pos, 2),
            oneByte = parseInt(oneByteString, 16);
        hexA.push(oneByte);
        pos += 2;
    }
    return hexA;
}
let dgram = require('dgram'),
    client = dgram.createSocket('udp4'),
    magicPacketTitle = 'FFFFFFFFFFFF',
    magicPacketEnd = '000000000000',
    magicPacketMac = (new Array(17)).join('509A4C195CAC'),
    //message = new Buffer(hexStringToBufferArr(magicPacketTitle + magicPacketMac + magicPacketEnd));
    message = Buffer.alloc(108, magicPacketTitle + magicPacketMac + magicPacketEnd, 'hex');
if (process.argv[2]) {
    client.send(message, 9, process.argv[2], (err) => {
        console.log(`已成功向IP为${process.argv[2]}的目标主机发送幻数据包`);
        client.close();
    });
} else {
    console.log('请输入目的ip');
}
