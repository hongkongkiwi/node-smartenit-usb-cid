var test = 0xFFEE;

var buf = Buffer.alloc(1,0);
buf.writeUInt8(test ^ 0xFF00);

console.log(buf);
