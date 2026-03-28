import { NextRequest, NextResponse } from 'next/server';

const KEEPER_URL = process.env.KEEPER_URL || 'http://127.0.0.1:3099';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action'); // 'health' or 'sync'
    const nodeId = searchParams.get('nodeId');

    try {
        if (action === 'health') {
            const res = await fetch(`${KEEPER_URL}/health`, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch health');
            const data = await res.json();
            return NextResponse.json(data);
        }

        if (action === 'sync') {
            if (!nodeId) return NextResponse.json({ error: 'nodeId required' }, { status: 400 });
            const res = await fetch(`${KEEPER_URL}/sync/${nodeId}`, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to start sync');
            const data = await res.json();
            return NextResponse.json(data);
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Keeper bot API error', details: error.message }, { status: 500 });
    }
}
