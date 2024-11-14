!/bin/sh
# Espera até que o serviço PostgreSQL esteja disponível na porta 5432
while ! nc -z $DB_HOST $DB_PORT; do
  echo "Aguardando PostgreSQL em $DB_HOST:$DB_PORT..."
  sleep 2
done
echo "PostgreSQL está pronto!"
