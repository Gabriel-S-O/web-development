@ECHO OFF

SET /P "name=Informe seu nome: "
SET /P "email=Informe seu e-mail: "
SET /P "commitMessage=Informe a mensagem do commit: "

git add .

git -c "user.name=%name%" -c "user.email=%email%" commit -m "%commitMessage%"

ECHO obrigado por nao zoar o git config da maquina

PAUSE 