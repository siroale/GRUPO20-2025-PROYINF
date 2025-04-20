run:
	docker compose start

stop:
	docker compose stop

restart:
	docker compose restart

rebuild:
	docker compose down --volumes --remove-orphans
	docker compose build --no-cache
	docker compose up --detach
