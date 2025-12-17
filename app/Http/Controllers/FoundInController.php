<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateItemCanBeFoundRequest;
use App\Http\Requests\UpdateItemCanBeFoundRequest;
use App\Models\FoundIn;
use App\Repository\FoundInReadRepository;
use App\Repository\FoundInWriteRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class FoundInController extends Controller
{
    private FoundInReadRepository $foundInReadRepository;
    private FoundInWriteRepository $foundInWriteRepository;

    public function __construct(
        FoundInReadRepository $foundInReadRepository,
        FoundInWriteRepository $foundInWriteRepository
    )
    {
        $this->foundInReadRepository = $foundInReadRepository;
        $this->foundInWriteRepository = $foundInWriteRepository;
    }

    public function getItemCanBeFoundById(int $id): JsonResponse
    {
        return response()->json($this->foundInReadRepository->getItemCanBeFoundById($id));
    }
    public function store(CreateItemCanBeFoundRequest $createFoundInRequest): RedirectResponse
    {
        $itemFoundIn = $createFoundInRequest->all();
        $newItemFoundIn = new FoundIn($itemFoundIn);
        $this->foundInWriteRepository->save($newItemFoundIn);

        return redirect()->route('found_in.list');
    }
    public function update(int $id, UpdateItemCanBeFoundRequest $updateItemCanBeFoundRequest): JsonResponse
    {
        $itemFoundIn = $this->foundInReadRepository->getItemCanBeFoundById($id);
        $itemFoundIn->update($updateItemCanBeFoundRequest->validated());
        return response()->json([
            'message' => 'Item updated successfully',
            'item' => $itemFoundIn,
        ]);
    }
    public function destroy(int $id): RedirectResponse
    {
        $itemFoundIn = $this->foundInReadRepository->getItemCanBeFoundById($id);
        $this->foundInWriteRepository->delete($itemFoundIn);

        return redirect()->route('found_in.list');
    }
}
