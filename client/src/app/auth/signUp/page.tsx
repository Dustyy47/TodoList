'use client';

import Button from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Navbar } from '@/components/molecules/Navbar';
import { authLinks } from '@/const/navlinks';
import { useAuthorize } from '@/hooks/useAuthorize';
import { SignUpFormFields } from '@/types';
import { Controller, useForm } from 'react-hook-form';

export default function SignUpPage() {
  const { control, handleSubmit } = useForm<SignUpFormFields>();

  const { submitSignUp, error } = useAuthorize();

  return (
    <div className='flex flex-col items-center w-full pt-10'>
      <div className='mb-[2.9375rem]'>
        <Navbar navLinks={authLinks} />
      </div>
      <form
        className='max-w-[37.5rem] w-full  bg-white-common rounded-common pt-10 px-5 pb-5'
        onSubmit={handleSubmit(submitSignUp)}
      >
        <p className='text-red-common'>{error}</p>
        <div className='mb-10'>
          <Controller
            defaultValue=''
            name='fullname'
            control={control}
            render={({ field }) => (
              <Input placeholder='Введите ФИО' label='ФИО' {...field} />
            )}
          />
        </div>
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
            defaultValue=''
            name='password'
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
        <Button type='submit'>Зарегистрироваться</Button>
      </form>
    </div>
  );
}
