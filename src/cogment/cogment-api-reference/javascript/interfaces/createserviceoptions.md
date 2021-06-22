Options for creating a service.

## Properties

### cogSettings

• **cogSettings**: [*CogSettings*](cogsettings.md)

[`CogSettings`](cogsettings.md) file generated by `cogment generate`.

**`example`** 
```typescript
import CogSettings from './CogSettings';
```

Defined in: [cogment/Cogment.ts:124](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/Cogment.ts#L124)

___

### grpcURL

• `Optional` **grpcURL**: *string*

URL of the Cogment gRPC backend.

**`defaultvalue`** 
`//${window.location.hostname}:8080`

Defined in: [cogment/Cogment.ts:130](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/Cogment.ts#L130)

___

### streamingTransportFactory

• `Optional` **streamingTransportFactory**: TransportFactory

gRPC transport for streaming calls.

**`defaultvalue`** 
```typescript
grpc.WebsocketTransport()
```

Defined in: [cogment/Cogment.ts:138](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/Cogment.ts#L138)

___

### unaryTransportFactory

• `Optional` **unaryTransportFactory**: TransportFactory

gRPC transport for unary calls.

**`defaultvalue`** 
```typescript
grpc.CrossBrowserHttpTransport({
  withCredentials: false,
})
```

Defined in: [cogment/Cogment.ts:148](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/Cogment.ts#L148)