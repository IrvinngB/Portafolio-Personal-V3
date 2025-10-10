# Programa para clasificar niveles de llenado de contenedores de basura en una ciudad inteligente
# Irvin Benitez
# Descripción:
# El programa solicita al usuario la cantidad de contenedores, registra el nivel de llenado de cada uno,
# clasifica cada contenedor como "VACÍO", "MEDIO" o "LLENO" según el porcentaje, muestra el estado de cada uno y el resumen general.
# Valida que los valores sean correctos y maneja errores de entrada.

try:
    # Solicitar la cantidad de contenedores
    n = int(input("Ingrese la cantidad de contenedores: "))
    if n <= 0:
        # Si la cantidad es inválida, lanza error
        raise ValueError("La cantidad de contenedores debe ser mayor que 0")

    niveles = []
    # Solicitar el nivel de llenado para cada contenedor
    for i in range(n):
        valor = int(input(f"Ingrese nivel del contenedor {i+1} (0-100): "))
        # Validar que el nivel esté en el rango permitido
        if valor < 0 or valor > 100:
            raise ValueError("Nivel fuera de rango (0-100)")
        niveles.append(valor)

    # Inicializar diccionario para el resumen por estado
    resumen = {"VACÍO": 0, "MEDIO": 0, "LLENO": 0}
    print("\n--- ESTADO DE LOS CONTENEDORES ---")

    # Clasificar y mostrar el estado de cada contenedor según el porcentaje de llenado
    for i in range(n):
        if niveles[i] < 50:
            estado = "VACÍO"
        elif niveles[i] < 80:
            estado = "MEDIO"
        else:
            estado = "LLENO"
        print(f"Contenedor {i+1}: {niveles[i]}% -> {estado}")
        resumen[estado] += 1

    # Mostrar resumen total por cada categoría
    print("\n--- RESUMEN GENERAL ---")
    for clave, cantidad in resumen.items():
        print(f"{clave}: {cantidad}")

except ValueError as e:
    # Mensaje para errores de datos inválidos
    print("Error en la entrada de datos:", e)
except Exception:
    # Mensaje para cualquier otro error
    print("Error en la entrada de datos.")
