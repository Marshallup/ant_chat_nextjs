Приложение "Копия зума"

## Для локального запуска

Команды для запуска:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Проверка на локальной сети:

Для проверке по сети wifi - необходимо добавить флаг разрешающий браузеру(пример на браузере Google Chrome) использовать девайсы без ssl, [chrome://flags/](Флаги хрома) и добавить "Insecure origins treated as secure" - пример "http://192.168.0.10:3000" (Должны быть ваша локальная сеть), также изменить env переменную "NEXT_PUBLIC_HOSTNAME" на ip локальной сети
