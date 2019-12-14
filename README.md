# Gulp Starter Kit

##  Установка
```
git clone https://github.com/mroforolhc/gulpStart new-project && cd new-project
git init
cd app/client && yarn
```
## Заупск
`yarn start` – сборка + сервер + отслеживание изменений

`yarn build` – обычная сборка

`yarn prod` – сборка в продакшн

`yarn prod:deploy` – сборка в продакшн + деплой

## Задачи
### gulp bootstrap
В сборщике используется bootstrap сетка из node_modules, в которой гуттеры и брейкпоины перезаписаны. css файл лежит уже скомпилированный в проекте и задачу запускать каждый раз не надо, но если вдруг возникнет критическая ситуация и понадобится исправить сетку, либо добавить что-то бутстраповское, помимо сетки, можно поправить .scss в src/styles/bootstrap и собрать заново файлик с помощью gulp bootstrap
