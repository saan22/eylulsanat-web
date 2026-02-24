'use client';

import { login } from '@/actions/auth';
import { useActionState } from 'react';
import { Loader2 } from 'lucide-react';

const initialState = {
    error: '',
};

export default function LoginForm() {
    // @ts-ignore - useActionState types can be tricky
    const [state, formAction, isPending] = useActionState(async (prev, formData) => {
        const res = await login(formData);
        if (res?.error) return { error: res.error };
        return { error: '' };
    }, initialState);

    return (
        <form action={formAction} className="space-y-4 w-full max-w-sm">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                    placeholder="••••••••"
                />
            </div>
            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition flex justify-center items-center"
            >
                {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : 'Giriş Yap'}
            </button>
        </form>
    );
}
