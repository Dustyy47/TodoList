'use client';

import Button from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Navbar } from '@/components/molecules/Navbar';
import { authLinks } from '@/const/navlinks';
import { useAuthorize } from '@/hooks/useAuthorize';
import { SignInFormFields } from '@/types';
import { Controller, useForm } from 'react-hook-form';

export default function SignInPage() {
  const { control, handleSubmit } = useForm<SignInFormFields>();

  const { submitSignIn, error } = useAuthorize();

  //   async function onSubmit(data: SignInFormFields) {
  //     const res = await UserAPI.signIn(data);
  //     alert(res?.token);
  //   }

  return (
    <div className='flex flex-col items-center w-full pt-10'>
      <div className='mb-[2.9375rem]'>
        <Navbar navLinks={authLinks} />
      </div>
      <form
        className='max-w-[37.5rem] w-full  bg-white-common rounded-common pt-10 px-5 pb-5'
        onSubmit={handleSubmit(submitSignIn)}
      >
        <p className='text-red-common'>{error}</p>
        <div className='mb-10'>
          <Controller
            defaultValue=''
            name='id'
            control={control}
            render={({ field }) => (
              <Input placeholder='Введите логин' label='Логин' {...field} />
            )}
          />
        </div>

        <div className='mb-20'>
          <Controller
            name='password'
            defaultValue=''
            control={control}
            render={({ field }) => (
              <Input
                placeholder='Введите пароль'
                isPassword
                label='Пароль'
                {...field}
              />
            )}
          />
        </div>
        <Button type='submit'>Войти</Button>
      </form>
    </div>
  );
}
