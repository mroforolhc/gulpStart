# Gulp Starter Kit

##  Установка
```
git clone https://github.com/mroforolhc/gulpStart new-project && cd new-project
git init
cd app/client && yarn
```
## Запуск

### Флаги
В сборке присутствуют два флага:  
* **`--watch`** - для отслеживания изменений.  
* **`--deploy`** - файлы собираются в отдельную папку и там же изменяются при отслеживании.  

### Команды
`yarn build` или `gulp` – сборка в **dist**.  
`yarn build:deploy` или `gulp --deploy` – сборка в **public**.  
`yarn dev` или `gulp --watch` – сборка в **dist** + отслеживание изменений.  
`yarn dev:deploy` или `gulp --deploy --watch` – сборка в **public** + отслеживание изменений.  

### Окружение
Для изменения окружения необходимо сменить значение переменной в `.env`, либо указать явно при запуске команды: `cross-env NODE_ENV=production *команда*`. При этом, команды остаются точно такими же.

При сборке в продакшн:
* Все картинки сжимаются.
* Стили минифицируются.
* Webpack собирает в production mode.
 
## Дополнительные таски
### gulp bootstrap
В сборщике используется bootstrap сетка из node_modules, 
в которой гуттеры и брейкпоины перезаписаны. 
css файл лежит уже скомпилированный в проекте и задачу запускать каждый 
раз не надо, но если вдруг возникнет критическая ситуация и понадобится 
исправить сетку, либо добавить что-то бутстраповское, помимо сетки, 
можно поправить .scss в src/styles/bootstrap и собрать заново файлик с 
помощью gulp bootstrap.

### gulp deploy
Переносит содержимое dist в public.