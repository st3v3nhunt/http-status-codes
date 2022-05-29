enum HttpExtension {
  HTTPDeltaEncoding = "HTTP Delta Encoding",
  WebDAV = "WebDAV",
}

interface StatusCodes {
  [key: number]: {
    deprecated?: boolean;
    experimental?: boolean;
    extension?: HttpExtension;
    status: number;
    statusText: string;
  };
}

const statusCodes: StatusCodes = {
  100: { status: 100, statusText: "Continue" },
  101: { status: 101, statusText: "Switching Protocol" },
  102: {
    status: 102,
    statusText: "Processing",
    extension: HttpExtension.WebDAV,
  },
  103: { status: 103, statusText: "Early Hints" },
  200: { status: 200, statusText: "OK" },
  201: { status: 201, statusText: "Created" },
  202: { status: 202, statusText: "Accepted" },
  203: { status: 203, statusText: "Non-Authoritative Information" },
  204: { status: 204, statusText: "No Content" },
  205: { status: 205, statusText: "Reset Content" },
  206: { status: 206, statusText: "Partial Content" },
  207: {
    status: 207,
    statusText: "Multi-Status",
    extension: HttpExtension.WebDAV,
  },
  208: {
    status: 208,
    extension: HttpExtension.WebDAV,
    statusText: "Already Reported",
  },
  226: {
    status: 226,
    statusText: "IM Used",
    extension: HttpExtension.HTTPDeltaEncoding,
  },
  300: { status: 300, statusText: "Multiple Choice" },
  301: { status: 301, statusText: "Moved Permanently" },
  302: { status: 302, statusText: "Found" },
  303: { status: 303, statusText: "See Other" },
  304: { status: 304, statusText: "Not Modified" },
  305: { status: 305, statusText: "Use Proxy", deprecated: true },
  306: { status: 306, statusText: "unused" },
  307: { status: 307, statusText: "Temporary Redirect" },
  308: { status: 308, statusText: "Permanent Redirect" },
  400: { status: 400, statusText: "Bad Request" },
  401: { status: 401, statusText: "Unauthorised" },
  402: { status: 402, statusText: "Payment Required", experimental: true },
  403: { status: 403, statusText: "Forbidden" },
  404: { status: 404, statusText: "Not Found" },
  405: { status: 405, statusText: "Method Not Allowed" },
  406: { status: 406, statusText: "Not Acceptable" },
  407: { status: 407, statusText: "Proxy Authentication Required" },
  408: { status: 408, statusText: "Request Timeout" },
  409: { status: 409, statusText: "Conflict" },
  410: { status: 410, statusText: "Gone" },
  411: { status: 411, statusText: "Length Required" },
  412: { status: 412, statusText: "Precondition Failed" },
  413: { status: 413, statusText: "Payload Too Large" },
  414: { status: 414, statusText: "URI Too Long" },
  415: { status: 415, statusText: "Unsupported Media Type" },
  416: { status: 416, statusText: "Range Not Satisfiable" },
  417: { status: 417, statusText: "Expectation Failed" },
  418: { status: 418, statusText: "I'm a teapot" },
  421: { status: 421, statusText: "Misdirected Request" },
  422: {
    status: 422,
    statusText: "Unprocessable Entity",
    extension: HttpExtension.WebDAV,
  },
  423: { status: 423, statusText: "Locked", extension: HttpExtension.WebDAV },
  424: {
    status: 424,
    statusText: "Failed Dependency",
    extension: HttpExtension.WebDAV,
  },
  425: { status: 425, statusText: "Too Early", experimental: true },
  426: { status: 426, statusText: "Upgrade Required" },
  428: { status: 428, statusText: "Precondition Required" },
  429: { status: 429, statusText: "Too Many Requests" },
  431: { status: 431, statusText: "Request Header Fields Too Large" },
  451: { status: 451, statusText: "Unavailable For Legal Reasons" },
  500: { status: 500, statusText: "Internal Server Error" },
  501: { status: 501, statusText: "Not Implemented" },
  502: { status: 502, statusText: "Bad Gateway" },
  503: { status: 503, statusText: "Service Unavailable" },
  504: { status: 504, statusText: "Gateway Timeout" },
  505: { status: 505, statusText: "HTTP Version Not Supported" },
  506: { status: 506, statusText: "Variant Also Negotiates" },
  507: {
    status: 507,
    statusText: "Insufficient Storage",
    extension: HttpExtension.WebDAV,
  },
  508: {
    status: 508,
    statusText: "Loop Detected",
    extension: HttpExtension.WebDAV,
  },
  510: { status: 510, statusText: "Not Extended" },
  511: { status: 511, statusText: "Network Authentication Required" },
};

export default statusCodes;
