import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as BufferLayout from "buffer-layout";

export const publickey_array5 = (property = "publickey_array5"): unknown => {
  const layout = BufferLayout.blob(160, property);

  const _decode = layout.decode.bind(layout);
  const _encode = layout.encode.bind(layout);

  layout.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    let ret = <any>[];
    for (var j=0;j<5;j++){
      let temp_bytes = <any>[];
      for (var k=0;k<32;k++){
        temp_bytes.push(data[j*32+k]);
      }
      ret.push(new PublicKey(temp_bytes))
    }
    return ret;
  };

  layout.encode = (num: [PublicKey], buffer: Buffer, offset: number) => {

    let data = <any>[];
    for (var j=0;j<5;j++){
      let item = num[j];
      const a = item.toBuffer();
      let b = Buffer.from(a);
      if (b.length !== 32) {
        const zeroPad = Buffer.alloc(32);
        b.copy(zeroPad);
        b = zeroPad;
      }
      for (var k=0;k<32;k++){
        data.push(b[k]);
      }

    }

    return _encode(data.toBuffer(), buffer, offset);
  };

  return layout;

};

export const publickey_array11 = (property = "publickey_array11"): unknown => {
  const layout = BufferLayout.blob(352, property);

  const _decode = layout.decode.bind(layout);
  const _encode = layout.encode.bind(layout);

  layout.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    let ret = <any>[];
    for (var j=0;j<11;j++){
      let temp_bytes = <any>[];
      for (var k=0;k<32;k++){
        temp_bytes.push(data[j*32+k]);
      }
      ret.push(new PublicKey(temp_bytes))
    }
    return ret;
  };

  layout.encode = (num: [PublicKey], buffer: Buffer, offset: number) => {

    let data = <any>[];
    for (var j=0;j<11;j++){
      let item = num[j];
      const a = item.toBuffer();
      let b = Buffer.from(a);
      if (b.length !== 32) {
        const zeroPad = Buffer.alloc(32);
        b.copy(zeroPad);
        b = zeroPad;
      }
      for (var k=0;k<32;k++){
        data.push(b[k]);
      }

    }

    return _encode(data.toBuffer(), buffer, offset);
  };

  return layout;

};

export const publickey_array30 = (property = "publickey_array30"): unknown => {
  const layout = BufferLayout.blob(960, property);

  const _decode = layout.decode.bind(layout);
  const _encode = layout.encode.bind(layout);

  layout.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    let ret = <any>[];
    for (var j=0;j<30;j++){
      let temp_bytes = <any>[];
      for (var k=0;k<32;k++){
        temp_bytes.push(data[j*32+k]);
      }
      ret.push(new PublicKey(temp_bytes))
    }
    return ret;
  };

  layout.encode = (num: [PublicKey], buffer: Buffer, offset: number) => {

    let data = <any>[];
    for (var j=0;j<30;j++){
      let item = num[j];
      const a = item.toBuffer();
      let b = Buffer.from(a);
      if (b.length !== 32) {
        const zeroPad = Buffer.alloc(32);
        b.copy(zeroPad);
        b = zeroPad;
      }
      for (var k=0;k<32;k++){
        data.push(b[k]);
      }

    }

    return _encode(data.toBuffer(), buffer, offset);
  };

  return layout;

};

export const uint64_array30 = (property = "uint64_array30"): unknown => {
  const layout = BufferLayout.blob(240, property);

  const _decode = layout.decode.bind(layout);
  const _encode = layout.encode.bind(layout);

  layout.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    let ret = <any>[];
    for (var j=0;j<30;j++){
      let temp_bytes = <any>[];
      for (var k=0;k<8;k++){
        temp_bytes.push(data[j*8+k]);
      }
      ret.push(new BN(
        [...temp_bytes]
          .reverse()
          .map((i) => `00${i.toString(16)}`.slice(-2))
          .join(""),
        16
      ).toNumber())
    }
    return ret;
  };

  layout.encode = (num: any, buffer: Buffer, offset: number) => {
    let data = <any>[];
    for (var j=0;j<30;j++){
      let item = num[j];
      const a = item.toArray().reverse();
      let b = Buffer.from(a);
      if (b.length !== 8) {
        const zeroPad = Buffer.alloc(8);
        b.copy(zeroPad);
        b = zeroPad;
      }
      for (var k=0;k<8;k++){
        data.push(b[k]);
      }
    }

    return _encode(data.toBuffer(), buffer, offset);
  };

  return layout;
};

export const uint8_array15 = (property = "uint8_array15"): unknown => {
  const layout = BufferLayout.blob(15, property);

  const _decode = layout.decode.bind(layout);
  const _encode = layout.encode.bind(layout);

  layout.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    let ret = <any>[];
    for (var j=0;j<15;j++){
      let temp_bytes = <any>[];

      temp_bytes.push(data[j]);

      ret.push(new BN(
        [...temp_bytes]
          .reverse()
          .map((i) => `00${i.toString(16)}`.slice(-2))
          .join(""),
        16
      ).toNumber())
    }
    return ret;
  };

  layout.encode = (num: any, buffer: Buffer, offset: number) => {
    let data = <any>[];
    for (var j=0;j<15;j++){
      let item = num[j];
      const a = item.toArray().reverse();
      let b = Buffer.from(a);
      if (b.length !== 1) {
        const zeroPad = Buffer.alloc(1);
        b.copy(zeroPad);
        b = zeroPad;
      }
      data.push(b[0]);


    }

    return _encode(data.toBuffer(), buffer, offset);
  };

  return layout;
};

export const uint32_array15 = (property = "uint32_array15"): unknown => {
  const layout = BufferLayout.blob(60, property);

  const _decode = layout.decode.bind(layout);
  const _encode = layout.encode.bind(layout);

  layout.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    let ret = <any>[];
    for (var j=0;j<15;j++){
      let temp_bytes = <any>[];
      for (var k=0;k<4;k++){
        temp_bytes.push(data[j*4+k]);
      }
      ret.push(new BN(
        [...temp_bytes]
          .reverse()
          .map((i) => `00${i.toString(16)}`.slice(-2))
          .join(""),
        16
      ).toNumber())
    }
    return ret;
  };

  layout.encode = (num: any, buffer: Buffer, offset: number) => {
    let data = <any>[];
    for (var j=0;j<15;j++){
      let item = num[j];
      const a = item.toArray().reverse();
      let b = Buffer.from(a);
      if (b.length !== 4) {
        const zeroPad = Buffer.alloc(4);
        b.copy(zeroPad);
        b = zeroPad;
      }
      for (var k=0;k<4;k++){
        data.push(b[k]);
      }

    }

    return _encode(data.toBuffer(), buffer, offset);
  };

  return layout;
};

export const uint64_array15 = (property = "uint64_array15"): unknown => {
  const layout = BufferLayout.blob(120, property);

  const _decode = layout.decode.bind(layout);
  const _encode = layout.encode.bind(layout);

  layout.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    let ret = <any>[];
    for (var j=0;j<15;j++){
      let temp_bytes = <any>[];
      for (var k=0;k<8;k++){
        temp_bytes.push(data[j*8+k]);
      }
      ret.push(new BN(
        [...temp_bytes]
          .reverse()
          .map((i) => `00${i.toString(16)}`.slice(-2))
          .join(""),
        16
      ).toNumber())
    }
    return ret;
  };

  layout.encode = (num: any, buffer: Buffer, offset: number) => {
    let data = <any>[];
    for (var j=0;j<15;j++){
      let item = num[j];
      const a = item.toArray().reverse();
      let b = Buffer.from(a);
      if (b.length !== 8) {
        const zeroPad = Buffer.alloc(8);
        b.copy(zeroPad);
        b = zeroPad;
      }
      for (var k=0;k<8;k++){
        data.push(b[k]);
      }

    }

    return _encode(data.toBuffer(), buffer, offset);
  };

  return layout;
};

/**
 * Layout for a public key
 */
export const publicKey = (property = "publicKey"): unknown => {
  const publicKeyLayout = BufferLayout.blob(32, property);

  const _decode = publicKeyLayout.decode.bind(publicKeyLayout);
  const _encode = publicKeyLayout.encode.bind(publicKeyLayout);

  publicKeyLayout.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    return new PublicKey(data);
  };

  publicKeyLayout.encode = (key: PublicKey, buffer: Buffer, offset: number) => {
    return _encode(key.toBuffer(), buffer, offset);
  };

  return publicKeyLayout;
};

/**
 * Layout for a 32bit unsigned value
 */
export const uint32 = (property = "uint32"): unknown => {
  const layout = BufferLayout.blob(4, property);

  const _decode = layout.decode.bind(layout);
  const _encode = layout.encode.bind(layout);

  layout.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    return new BN(
      [...data]
        .reverse()
        .map((i) => `00${i.toString(16)}`.slice(-2))
        .join(""),
      16
    );
  };

  layout.encode = (num: BN, buffer: Buffer, offset: number) => {
    const a = num.toArray().reverse();
    let b = Buffer.from(a);
    if (b.length !== 4) {
      const zeroPad = Buffer.alloc(4);
      b.copy(zeroPad);
      b = zeroPad;
    }
    return _encode(b, buffer, offset);
  };

  return layout;
};
/**
 * Layout for a 64bit unsigned value
 */
export const uint64 = (property = "uint64"): unknown => {
  const layout = BufferLayout.blob(8, property);

  const _decode = layout.decode.bind(layout);
  const _encode = layout.encode.bind(layout);

  layout.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    return new BN(
      [...data]
        .reverse()
        .map((i) => `00${i.toString(16)}`.slice(-2))
        .join(""),
      16
    );
  };

  layout.encode = (num: BN, buffer: Buffer, offset: number) => {
    const a = num.toArray().reverse();
    let b = Buffer.from(a);
    if (b.length !== 8) {
      const zeroPad = Buffer.alloc(8);
      b.copy(zeroPad);
      b = zeroPad;
    }
    return _encode(b, buffer, offset);
  };

  return layout;
};

// TODO: wrap in BN (what about decimals?)
export const uint128 = (property = "uint128"): unknown => {
  const layout = BufferLayout.blob(16, property);

  const _decode = layout.decode.bind(layout);
  const _encode = layout.encode.bind(layout);

  layout.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    return new BN(
      [...data]
        .reverse()
        .map((i) => `00${i.toString(16)}`.slice(-2))
        .join(""),
      16
    );
  };

  layout.encode = (num: BN, buffer: Buffer, offset: number) => {
    const a = num.toArray().reverse();
    let b = Buffer.from(a);
    if (b.length !== 16) {
      const zeroPad = Buffer.alloc(16);
      b.copy(zeroPad);
      b = zeroPad;
    }

    return _encode(b, buffer, offset);
  };

  return layout;
};

/**
 * Layout for a Rust String type
 */
export const rustString = (property = "string"): unknown => {
  const rsl = BufferLayout.struct(
    [
      BufferLayout.u32("length"),
      BufferLayout.u32("lengthPadding"),
      BufferLayout.blob(BufferLayout.offset(BufferLayout.u32(), -8), "chars"),
    ],
    property
  );
  const _decode = rsl.decode.bind(rsl);
  const _encode = rsl.encode.bind(rsl);

  rsl.decode = (buffer: Buffer, offset: number) => {
    const data = _decode(buffer, offset);
    return data.chars.toString("utf8");
  };

  rsl.encode = (str: string, buffer: Buffer, offset: number) => {
    const data = {
      chars: Buffer.from(str, "utf8"),
    };
    return _encode(data, buffer, offset);
  };

  return rsl;
};
