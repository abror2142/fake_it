<?php

namespace App\Controller;

header('Access-Control-Allow-Origin: *');

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;

final class FakerController extends AbstractController
{
    #[Route('/faker', name: 'app_faker')]
    public function index(): Response
    {
      
        return $this->render('faker/index.html.twig', [
            'controller_name' => 'FakerController',
        ]);
    }

    #[Route("/faker/image", name: 'app_faker_image', methods: ['GET'])]
    public function getImageUrl(Request $request): Response
    {
        $url = $request->query->get('url');
        $data = file_get_contents($url);
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }   
}
