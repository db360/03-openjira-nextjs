import { NextFetchEvent, NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest, ev: NextFetchEvent) {
    // validacion que no se hace en el middleware
    // if (req.page.name === '/api/entries') return NextResponse.next(); // la id vendria como params en el request

    const id = req.page.params?.id || '';

    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');

    if (!checkMongoIDRegExp.test(id)) { // no se puede utilizar la validacion de mongo en middlewares
    //   return res.status(400).json({ message: `Id ${id} no es válido` });
        return new Response(JSON.stringify({message: `Id ${id} no es válido`}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return NextResponse.next();
}